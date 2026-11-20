/**
 * Detección de montos dentro de un mensaje.
 *
 * Devuelve todos los candidatos en orden, con su posición y su confianza.
 * No decide todavía a qué gasto pertenece cada monto: eso es la segmentación
 * (sesión 4).
 *
 * Reglas:
 * - Un número suelto menor a 1.000 pesos no es un monto: es cantidad o fecha.
 * - Un número seguido de una unidad ("3 rollos", "2 kilos") es cantidad.
 * - Un número seguido de "de" + mes es una fecha.
 * - "45 mil", "120 mil" y "medio millón" se interpretan como montos.
 */

import { parsearMonto } from '@/domain/money';

import { normalizar, tokenizar } from './normalizar';
import { esPalabraNumerica, valorDeSecuencia } from './numeros';

export type MontoDetectado = {
  /** Monto en centavos. */
  valorMenor: number;
  /** Fragmento del texto original que produjo el monto. */
  texto: string;
  /** Posición en el texto normalizado (coincide con el original). */
  inicio: number;
  fin: number;
  /** 0 a 1. */
  confianza: number;
  /** true si el texto lo marca como precio por unidad ("c/u", "cada uno"). */
  esPrecioUnitario: boolean;
};

export const MESES = new Set([
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]);

export const UNIDADES = new Set([
  'kilo',
  'kilos',
  'gramo',
  'gramos',
  'bulto',
  'bultos',
  'rollo',
  'rollos',
  'litro',
  'litros',
  'unidad',
  'unidades',
  'galon',
  'galones',
  'caja',
  'cajas',
  'saco',
  'sacos',
  'metro',
  'metros',
  'docena',
  'docenas',
  'hora',
  'horas',
  'dia',
  'dias',
  'mes',
  'meses',
  'ano',
  'anos',
]);

/** 1.000 pesos expresados en centavos: por debajo no se considera monto. */
const UMBRAL_MONTO_MENOR = 100_000;

function esTokenNumerico(texto: string): boolean {
  const limpio = texto.replace(/^\$/, '').replace(/[.,]+$/, '');
  return /^\d[\d.,]*$/.test(limpio);
}

function esPrecioUnitario(textoNormalizado: string, fin: number): boolean {
  return /c\/u|cada uno/.test(textoNormalizado.slice(fin, fin + 12));
}

export function detectarMontos(texto: string): MontoDetectado[] {
  const normalizado = normalizar(texto);
  const tokens = tokenizar(normalizado);
  const usados = new Set<number>();
  const montos: MontoDetectado[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (usados.has(i)) continue;

    const token = tokens[i];

    if (esTokenNumerico(token.texto)) {
      const limpio = token.texto.replace(/^\$/, '').replace(/[.,]+$/, '');
      let valor = parsearMonto(limpio);
      if (valor === null) continue;

      const anterior = tokens[i - 1]?.texto;
      const siguiente = tokens[i + 1]?.texto;
      const tieneSimbolo = token.texto.startsWith('$') || anterior === '$';
      const tieneSeparador = /[.,]/.test(limpio);
      const esMoneda = siguiente === 'pesos' || siguiente === 'peso';

      // Fecha: "12 de marzo".
      if (siguiente === 'de' && MESES.has(tokens[i + 2]?.texto ?? '')) continue;

      // Cantidad: "3 rollos", "2 kilos".
      if (siguiente && UNIDADES.has(siguiente) && !tieneSimbolo) continue;

      let fin = token.fin;

      if (siguiente === 'mil') {
        valor *= 1000;
        usados.add(i + 1);
        fin = tokens[i + 1].fin;
      } else if (siguiente === 'millon' || siguiente === 'millones') {
        valor *= 1_000_000;
        usados.add(i + 1);
        fin = tokens[i + 1].fin;
      }

      // Un número suelto y pequeño es cantidad, no monto.
      if (!tieneSimbolo && !tieneSeparador && !esMoneda && valor < UMBRAL_MONTO_MENOR) {
        continue;
      }

      montos.push({
        valorMenor: valor,
        texto: texto.slice(token.inicio, fin),
        inicio: token.inicio,
        fin,
        confianza: tieneSimbolo ? 0.97 : tieneSeparador || esMoneda ? 0.92 : 0.8,
        esPrecioUnitario: esPrecioUnitario(normalizado, fin),
      });
      continue;
    }

    if (esPalabraNumerica(token.texto)) {
      const partes: string[] = [];
      let j = i;

      while (j < tokens.length) {
        const palabra = tokens[j].texto;

        if (esPalabraNumerica(palabra)) {
          partes.push(palabra);
          j++;
          continue;
        }

        if (
          palabra === 'y' &&
          partes.length > 0 &&
          tokens[j + 1] &&
          esPalabraNumerica(tokens[j + 1].texto)
        ) {
          j++;
          continue;
        }

        break;
      }

      const valorMenor = valorDeSecuencia(partes) * 100;
      for (let k = i; k < j; k++) usados.add(k);

      if (valorMenor < UMBRAL_MONTO_MENOR) continue;

      const fin = tokens[j - 1].fin;
      montos.push({
        valorMenor,
        texto: texto.slice(token.inicio, fin),
        inicio: token.inicio,
        fin,
        confianza: 0.88,
        esPrecioUnitario: esPrecioUnitario(normalizado, fin),
      });
    }
  }

  return montos.sort((a, b) => a.inicio - b.inicio);
}
