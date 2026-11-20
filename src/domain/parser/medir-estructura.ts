/**
 * Medición de la estructura completa del parser sobre el corpus.
 *
 * Compara, caso por caso: cantidad de ítems, monto, concepto, cantidad,
 * unidad, equipo y bandera de revisión.
 *
 * La categoría no se mide acá: llega en la sesión 5.
 */

import type { CasoParser, GastoEsperado } from './corpus-types';
import { parsearMensaje } from './parser';
import type { BorradorGasto, ResultadoParseo } from './types';

export type FallaEstructura = {
  id: string;
  plantilla: string;
  texto: string;
  detalle: string;
};

export type ResultadoEstructura = {
  total: number;
  exactos: number;
  exactitud: number;
  categorias: { total: number; exactas: number; exactitud: number };
  porPlantilla: Record<string, { total: number; exactos: number }>;
  fallas: FallaEstructura[];
};

function erroresDeItem(
  esperado: GastoEsperado,
  detectado: BorradorGasto | undefined,
): string[] {
  if (!detectado) return ['falta el ítem'];

  const errores: string[] = [];

  if (esperado.montoMenor !== detectado.montoMenor) {
    errores.push(`monto ${esperado.montoMenor} != ${detectado.montoMenor}`);
  }

  const faltantes = esperado.conceptoContiene.filter(
    (palabra) => !detectado.concepto.includes(palabra),
  );
  if (faltantes.length > 0) {
    errores.push(`concepto sin [${faltantes.join(', ')}] ("${detectado.concepto}")`);
  }

  if (esperado.cantidad !== undefined && esperado.cantidad !== detectado.cantidad) {
    errores.push(`cantidad ${esperado.cantidad} != ${detectado.cantidad}`);
  }

  if (esperado.unidad !== undefined && esperado.unidad !== detectado.unidad) {
    errores.push(`unidad ${esperado.unidad} != ${detectado.unidad}`);
  }

  if (esperado.equipo !== undefined && esperado.equipo !== detectado.equipo) {
    errores.push(`equipo ${esperado.equipo} != ${detectado.equipo}`);
  }

  if (esperado.categoriaId !== undefined && esperado.categoriaId !== detectado.categoriaId) {
    errores.push(`categoría ${esperado.categoriaId} != ${detectado.categoriaId}`);
  }

  if (esperado.etiquetaContiene && esperado.etiquetaContiene.length > 0) {
    const etiqueta = detectado.etiqueta ?? '';
    const faltantes = esperado.etiquetaContiene.filter(
      (palabra) => !etiqueta.includes(palabra),
    );
    if (faltantes.length > 0) {
      errores.push(`etiqueta sin [${faltantes.join(', ')}] ("${etiqueta}")`);
    }
  }

  return errores;
}

function compararCaso(caso: CasoParser, resultado: ResultadoParseo): string[] {
  const errores: string[] = [];

  if (resultado.items.length !== caso.esperado.items.length) {
    errores.push(
      `ítems ${caso.esperado.items.length} != ${resultado.items.length}`,
    );
  }

  const limite = Math.min(
    caso.esperado.items.length,
    resultado.items.length,
  );

  for (let i = 0; i < limite; i++) {
    const problemas = erroresDeItem(
      caso.esperado.items[i],
      resultado.items[i],
    );
    if (problemas.length > 0) {
      errores.push(`ítem ${i + 1}: ${problemas.join('; ')}`);
    }
  }

  if (resultado.requiereRevision !== caso.esperado.requiereRevision) {
    errores.push(
      `revisión ${caso.esperado.requiereRevision} != ${resultado.requiereRevision}`,
    );
  }

  return errores;
}

export function medirEstructura(casos: CasoParser[]): ResultadoEstructura {
  const porPlantilla: Record<string, { total: number; exactos: number }> = {};
  const fallas: FallaEstructura[] = [];
  let exactos = 0;
  let categoriasTotal = 0;
  let categoriasExactas = 0;

  for (const caso of casos) {
    const resultado = parsearMensaje(caso.texto);
    const errores = compararCaso(caso, resultado);
    const acierto = errores.length === 0;
    const clave = caso.plantilla ?? 'adversario';

    const limite = Math.min(caso.esperado.items.length, resultado.items.length);
    for (let i = 0; i < limite; i++) {
      const esperado = caso.esperado.items[i];
      if (esperado.categoriaId === undefined) continue;
      categoriasTotal++;
      if (esperado.categoriaId === resultado.items[i].categoriaId) {
        categoriasExactas++;
      }
    }

    if (acierto) exactos++;
    else {
      fallas.push({
        id: caso.id,
        plantilla: clave,
        texto: caso.texto,
        detalle: errores.join(' | '),
      });
    }

    porPlantilla[clave] ??= { total: 0, exactos: 0 };
    porPlantilla[clave].total++;
    if (acierto) porPlantilla[clave].exactos++;
  }

  return {
    total: casos.length,
    exactos,
    exactitud: casos.length === 0 ? 0 : exactos / casos.length,
    categorias: {
      total: categoriasTotal,
      exactas: categoriasExactas,
      exactitud: categoriasTotal === 0 ? 0 : categoriasExactas / categoriasTotal,
    },
    porPlantilla,
    fallas,
  };
}

export function formatearReporteEstructura(resultado: ResultadoEstructura): string {
  const porcentaje = (resultado.exactitud * 100).toFixed(1);
  const categorias = (resultado.categorias.exactitud * 100).toFixed(1);
  const lineas = [
    `Estructura: ${resultado.exactos}/${resultado.total} (${porcentaje}%)`,
    `Categorías: ${resultado.categorias.exactas}/${resultado.categorias.total} (${categorias}%)`,
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
        `  ${falla.id} [${falla.plantilla}] "${falla.texto}"\n      ${falla.detalle}`,
      );
    }
  }

  return lineas.join('\n');
}
