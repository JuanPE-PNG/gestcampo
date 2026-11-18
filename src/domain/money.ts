/**
 * Manejo de dinero.
 *
 * Todo monto se guarda como entero en unidades menores (centavos).
 * Nunca se usan decimales flotantes para representar dinero.
 */

import { MONEDA } from '@/config';

/**
 * Convierte un texto de monto a unidades menores.
 *
 * Recibe SOLO el monto, no el mensaje completo: extraer el monto de una frase
 * es trabajo del parser (fase F3).
 *
 * Acepta formatos como "45000", "45.000", "1.234,56", "$ 87.500" y "0,75".
 * Devuelve null si no puede interpretarlo con seguridad.
 */
export function parsearMonto(entrada: string): number | null {
  if (typeof entrada !== 'string') return null;

  let texto = entrada.trim();
  if (texto === '') return null;

  const negativo = texto.startsWith('-');
  if (negativo) texto = texto.slice(1);

  texto = texto.replace(/[^\d.,]/g, '');
  if (texto === '' || !/\d/.test(texto)) return null;

  const ultimaComa = texto.lastIndexOf(',');
  const ultimoPunto = texto.lastIndexOf('.');
  const tieneComa = ultimaComa !== -1;
  const tienePunto = ultimoPunto !== -1;

  let entero = texto;
  let decimales = '';

  if (tieneComa && tienePunto) {
    const corte = Math.max(ultimaComa, ultimoPunto);
    entero = texto.slice(0, corte).replace(/[.,]/g, '');
    decimales = texto.slice(corte + 1);
  } else if (tieneComa || tienePunto) {
    const separador = tieneComa ? ',' : '.';
    const partes = texto.split(separador);

    if (partes.length > 2) {
      // Varios separadores iguales: son de miles (1.234.567).
      entero = partes.join('');
    } else {
      const [izquierda, derecha] = partes;

      if (derecha.length === 3 && izquierda.length >= 1 && izquierda.length <= 3) {
        // 45.000 -> cuarenta y cinco mil.
        entero = izquierda + derecha;
      } else if (derecha.length >= 1 && derecha.length <= 2) {
        entero = izquierda;
        decimales = derecha;
      } else {
        return null;
      }
    }
  }

  if (entero === '') entero = '0';
  if (!/^\d+$/.test(entero) || !/^\d*$/.test(decimales)) return null;

  const centavos = (decimales + '00').slice(0, 2);
  const tercerDigito = decimales.length > 2 ? Number(decimales[2]) : 0;
  const valor = Number(entero) * 100 + Number(centavos) + (tercerDigito >= 5 ? 1 : 0);

  if (!Number.isSafeInteger(valor)) return null;

  return negativo ? -valor : valor;
}

/** Formatea un monto en unidades menores para mostrarlo al usuario. */
export function formatearMonto(unidadesMenores: number, moneda: string = MONEDA): string {
  const tieneCentavos = Math.abs(unidadesMenores) % 100 !== 0;
  const decimales = tieneCentavos ? 2 : 0;

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: moneda,
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(unidadesMenores / 100);
}
