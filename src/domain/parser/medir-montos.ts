/**
 * Medición de la extracción de montos sobre el corpus.
 *
 * Solo mide montos: la segmentación y la categoría se miden en sesiones
 * posteriores. Para los casos con precio unitario ("a 29.000 c/u"), el monto
 * esperado es el precio unitario, no el total: el total se calcula al
 * segmentar.
 */

import type { CasoParser } from './corpus-types';
import { detectarMontos } from './monto';

export type FallaMedicion = {
  id: string;
  plantilla: string;
  texto: string;
  esperado: number[];
  detectado: number[];
};

export type ResultadoMedicion = {
  total: number;
  exactos: number;
  exactitud: number;
  porPlantilla: Record<string, { total: number; exactos: number }>;
  fallas: FallaMedicion[];
};

function ordenar(valores: number[]): number[] {
  return [...valores].sort((a, b) => a - b);
}

function iguales(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((valor, indice) => valor === b[indice]);
}

function montosEsperados(caso: CasoParser): number[] {
  const esUnitario = /c\/u|cada uno/i.test(caso.texto);

  return ordenar(
    caso.esperado.items.flatMap((item) => {
      if (item.montoMenor === null) return [];
      if (esUnitario && item.cantidad && item.cantidad > 0) {
        return [Math.round(item.montoMenor / item.cantidad)];
      }
      return [item.montoMenor];
    }),
  );
}

export function medirMontos(casos: CasoParser[]): ResultadoMedicion {
  const porPlantilla: Record<string, { total: number; exactos: number }> = {};
  const fallas: FallaMedicion[] = [];
  let exactos = 0;

  for (const caso of casos) {
    const esperado = montosEsperados(caso);
    const detectado = ordenar(
      detectarMontos(caso.texto).map((monto) => monto.valorMenor),
    );
    const acierto = iguales(esperado, detectado);

    if (acierto) exactos++;
    else {
      fallas.push({
        id: caso.id,
        plantilla: caso.plantilla ?? 'adversario',
        texto: caso.texto,
        esperado,
        detectado,
      });
    }

    const clave = caso.plantilla ?? 'adversario';
    porPlantilla[clave] ??= { total: 0, exactos: 0 };
    porPlantilla[clave].total++;
    if (acierto) porPlantilla[clave].exactos++;
  }

  return {
    total: casos.length,
    exactos,
    exactitud: casos.length === 0 ? 0 : exactos / casos.length,
    porPlantilla,
    fallas,
  };
}

/** Reporte legible, para revisar a mano o volcar en la decisión final. */
export function formatearReporte(resultado: ResultadoMedicion): string {
  const porcentaje = (resultado.exactitud * 100).toFixed(1);
  const lineas = [
    `Montos: ${resultado.exactos}/${resultado.total} (${porcentaje}%)`,
    '',
    'Por plantilla:',
  ];

  for (const [plantilla, datos] of Object.entries(resultado.porPlantilla).sort()) {
    lineas.push(`  ${plantilla.padEnd(20)} ${datos.exactos}/${datos.total}`);
  }

  if (resultado.fallas.length > 0) {
    lineas.push('', 'Fallas:');
    for (const falla of resultado.fallas) {
      lineas.push(
        `  ${falla.id} [${falla.plantilla}] "${falla.texto}" esperado=[${falla.esperado}] detectado=[${falla.detectado}]`,
      );
    }
  }

  return lineas.join('\n');
}
