/**
 * Parser de mensajes (fase F1, sesión 4).
 *
 * Convierte un mensaje escrito a mano en uno o varios borradores de gasto.
 *
 * Estrategia:
 * 1. Detectar los montos (sesión 3) y usarlos como anclas.
 * 2. Partir el mensaje por comas, punto y coma y la conjunción "y".
 * 3. Unir los fragmentos sin monto con el fragmento que sí tiene monto
 *    (pasa en las notas de voz: "compré aceite..., cuarenta y cinco mil").
 * 4. Limpiar cada fragmento: quitar cantidad, equipo, verbos, moneda y
 *    conectores, y quedarse con el nombre del gasto.
 *
 * No asigna categoría todavía: eso es la sesión 5.
 */

import type { BorradorGasto, MotivoRevision, ResultadoParseo } from './types';

import { clasificarConcepto } from './clasificar';
import { detectarMontos, MESES, UNIDADES, type MontoDetectado } from './monto';
import { normalizar, tokenizar, type Token } from './normalizar';
import { esPalabraNumerica } from './numeros';

type EquipoInfo = {
  canonico: string;
  /** Fragmento de regex, sin grupos, para reutilizar en limpieza. */
  fuente: string;
  patron: RegExp;
};

const EQUIPOS: EquipoInfo[] = [
  {
    canonico: 'bomba de agua',
    fuente: 'bomba(?:\\s+de\\s+agua)?',
    patron: /\bbomba(?:\s+de\s+agua)?\b/,
  },
  { canonico: 'motosierra', fuente: 'motosierra', patron: /\bmotosierra\b/ },
  { canonico: 'guadañadora', fuente: 'guadanadora', patron: /\bguadanadora\b/ },
  { canonico: 'tractor', fuente: 'tractor', patron: /\btractor\b/ },
  { canonico: 'camioneta', fuente: 'camioneta', patron: /\bcamioneta\b/ },
];

const PALABRAS_VACIAS = new Set([
  'de',
  'del',
  'la',
  'el',
  'los',
  'las',
  'para',
  'con',
  'y',
  'en',
  'por',
  'un',
  'una',
  'unos',
  'unas',
  'a',
  'al',
  'que',
]);

const UNIDADES_REGEX = Array.from(UNIDADES)
  .sort((a, b) => b.length - a.length)
  .join('|');

const MESES_REGEX = Array.from(MESES).join('|');

type Bloque = {
  inicio: number;
  fin: number;
  montos: MontoDetectado[];
};

type ConceptoLimpio = {
  concepto: string;
  cantidad: number | null;
  unidad: string | null;
};

function detectarEquipo(texto: string): EquipoInfo | null {
  for (const equipo of EQUIPOS) {
    if (equipo.patron.test(texto)) return equipo;
  }
  return null;
}

function tienePalabras(texto: string): boolean {
  return texto
    .split(/\s+/)
    .some((palabra) => palabra.length > 2 && !PALABRAS_VACIAS.has(palabra));
}

function limpiarConcepto(fragmento: string, equipo: EquipoInfo | null): ConceptoLimpio {
  let texto = ` ${fragmento
    .replace(/[.,;!?]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
  let cantidad: number | null = null;
  let unidad: string | null = null;

  // Fecha al inicio: "el 12 de marzo".
  texto = texto.replace(
    new RegExp(`^ el \\d{1,2} de (${MESES_REGEX})\\s+`),
    ' ',
  );

  // Muletillas y verbos al inicio, en cualquier orden.
  for (let intento = 0; intento < 4; intento++) {
    const antes = texto;
    texto = texto.replace(
      /^ (eh|hola|buenas|compre|compramos|anote|anota)[\s,.!]+/,
      ' ',
    );
    if (texto === antes) break;
  }

  // Cantidad y unidad al inicio: "3 rollos de".
  const cantidadEncontrada = texto.match(
    new RegExp(`^ (\\d{1,4})\\s+(${UNIDADES_REGEX})\\s+(?:de\\s+)?`),
  );
  if (cantidadEncontrada) {
    cantidad = Number(cantidadEncontrada[1]);
    unidad = cantidadEncontrada[2];
    texto = texto.replace(cantidadEncontrada[0], ' ');
  }

  // "para el tractor", "para la motosierra".
  if (equipo) {
    texto = texto.replace(
      new RegExp(` para (el|la) ${equipo.fuente} `, 'g'),
      ' ',
    );
  }

  // Moneda y precio unitario.
  texto = texto.replace(/ (pesos|peso) /g, ' ');
  texto = texto.replace(/ (c\/u|cada uno) /g, ' ');

  // Conectores sueltos en los bordes.
  for (let intento = 0; intento < 4; intento++) {
    const antes = texto;
    texto = texto.replace(/^ (de|del|por|a|con|y|en|para) /, ' ');
    texto = texto.replace(/ (de|del|por|a|con|y|en|para) $/, ' ');
    if (texto === antes) break;
  }

  if (equipo) {
    // Equipo suelto al inicio: "tractor aceite".
    const inicial = new RegExp(`^ ${equipo.fuente} `);
    if (inicial.test(texto)) {
      const resto = texto.replace(inicial, ' ');
      if (tienePalabras(resto)) texto = resto;
    }

    // Equipo suelto al final: "soldadura tractor". No se quita si viene
    // precedido de artículo o preposición ("reparación de la motosierra").
    const conArticulo = new RegExp(` (de|del|la|el) ${equipo.fuente} $`);
    if (!conArticulo.test(texto)) {
      const suelto = new RegExp(` ${equipo.fuente} $`);
      const resto = texto.replace(suelto, ' ');
      if (texto !== resto && tienePalabras(resto)) texto = resto;
    }
  }

  return {
    concepto: texto.replace(/\s+/g, ' ').trim(),
    cantidad,
    unidad,
  };
}

function cortesDe(normalizado: string, tokens: Token[]): { inicio: number; fin: number }[] {
  const cortes: { inicio: number; fin: number }[] = [];

  // Comas que no están dentro de un número.
  for (const coincidencia of normalizado.matchAll(/,(?!\d)/g)) {
    const indice = coincidencia.index ?? 0;
    cortes.push({ inicio: indice, fin: indice + 1 });
  }

  for (const coincidencia of normalizado.matchAll(/[;\n]/g)) {
    const indice = coincidencia.index ?? 0;
    cortes.push({ inicio: indice, fin: indice + 1 });
  }

  // "y" como separador, pero no dentro de un número ("cuarenta y cinco mil").
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].texto !== 'y') continue;
    const anterior = tokens[i - 1]?.texto;
    const siguiente = tokens[i + 1]?.texto;
    const dentroDeNumero =
      anterior !== undefined &&
      siguiente !== undefined &&
      esPalabraNumerica(anterior) &&
      esPalabraNumerica(siguiente);
    if (dentroDeNumero) continue;
    cortes.push({ inicio: tokens[i].inicio, fin: tokens[i].fin });
  }

  return cortes.sort((a, b) => a.inicio - b.inicio);
}

function unir(a: Bloque, b: Bloque): Bloque {
  return {
    inicio: Math.min(a.inicio, b.inicio),
    fin: Math.max(a.fin, b.fin),
    montos: [...a.montos, ...b.montos].sort((x, y) => x.inicio - y.inicio),
  };
}

function construirBloques(normalizado: string, montos: MontoDetectado[]): Bloque[] {
  const tokens = tokenizar(normalizado);
  const cortes = cortesDe(normalizado, tokens);
  const crudos: Bloque[] = [];

  let cursor = 0;
  for (const corte of cortes) {
    if (corte.inicio > cursor) {
      crudos.push({ inicio: cursor, fin: corte.inicio, montos: [] });
    }
    cursor = Math.max(cursor, corte.fin);
  }
  if (cursor < normalizado.length) {
    crudos.push({ inicio: cursor, fin: normalizado.length, montos: [] });
  }

  for (const bloque of crudos) {
    bloque.montos = montos.filter(
      (monto) => monto.inicio >= bloque.inicio && monto.inicio < bloque.fin,
    );
  }

  // Un fragmento sin monto se une al siguiente con monto (notas de voz).
  const resultado: Bloque[] = [];
  let pendiente: Bloque | null = null;

  for (const bloque of crudos) {
    if (bloque.montos.length === 0) {
      pendiente = pendiente ? unir(pendiente, bloque) : bloque;
      continue;
    }
    resultado.push(pendiente ? unir(pendiente, bloque) : bloque);
    pendiente = null;
  }

  if (pendiente) {
    if (resultado.length > 0) {
      resultado[resultado.length - 1] = unir(
        resultado[resultado.length - 1],
        pendiente,
      );
    } else {
      resultado.push(pendiente);
    }
  }

  return resultado;
}

function crearItem(
  monto: MontoDetectado | null,
  fragmento: string,
  textoBloque: string,
  motivos: Set<MotivoRevision>,
  dudoso: boolean,
): BorradorGasto {
  const equipo = detectarEquipo(fragmento) ?? detectarEquipo(textoBloque);
  const limpio = limpiarConcepto(fragmento, equipo);

  const montoMenor =
    monto === null
      ? null
      : monto.esPrecioUnitario && limpio.cantidad
        ? monto.valorMenor * limpio.cantidad
        : monto.valorMenor;

  if (montoMenor === null) motivos.add('sin-monto');
  if (!limpio.concepto) motivos.add('sin-concepto');
  if (dudoso) motivos.add('segmentacion-dudosa');
  if (monto !== null && monto.confianza < 0.7) motivos.add('monto-ambiguo');

  const sugerencia = limpio.concepto
    ? clasificarConcepto(limpio.concepto)
    : null;

  if (sugerencia && sugerencia.confianza < 0.5) {
    motivos.add('categoria-dudosa');
  }

  return {
    montoMenor,
    concepto: limpio.concepto,
    etiqueta: sugerencia?.etiqueta ?? null,
    categoriaId: sugerencia?.categoriaId ?? null,
    equipo: equipo?.canonico ?? null,
    cantidad: limpio.cantidad,
    unidad: limpio.unidad,
    confianza: {
      monto: monto?.confianza ?? 0,
      concepto: limpio.concepto ? 0.85 : 0,
      categoria: sugerencia?.confianza ?? 0,
    },
  };
}

function parsearBloque(
  bloque: Bloque,
  normalizado: string,
  motivos: Set<MotivoRevision>,
): BorradorGasto[] {
  if (bloque.montos.length === 0) {
    const fragmento = normalizado.slice(bloque.inicio, bloque.fin);
    return [crearItem(null, fragmento, fragmento, motivos, false)];
  }

  if (bloque.montos.length === 1) {
    const monto = bloque.montos[0];
    const textoBloque = normalizado.slice(bloque.inicio, bloque.fin);
    const antes = normalizado.slice(bloque.inicio, monto.inicio);

    // Se prueban ambos lados con motivos temporales: si el concepto está
    // antes del monto se usa ese; si no, el que está después.
    const motivosAntes = new Set<MotivoRevision>();
    const itemAntes = crearItem(monto, antes, textoBloque, motivosAntes, false);
    if (itemAntes.concepto) {
      motivosAntes.forEach((motivo) => motivos.add(motivo));
      return [itemAntes];
    }

    const despues = normalizado.slice(monto.fin, bloque.fin);
    const motivosDespues = new Set<MotivoRevision>();
    const itemDespues = crearItem(monto, despues, textoBloque, motivosDespues, false);

    if (itemDespues.concepto) {
      motivosDespues.forEach((motivo) => motivos.add(motivo));
      return [itemDespues];
    }

    motivosAntes.forEach((motivo) => motivos.add(motivo));
    return [itemAntes];
  }

  // Varios montos sin separador: se parte por cada monto y se marca la duda.
  motivos.add('segmentacion-dudosa');
  const textoBloque = normalizado.slice(bloque.inicio, bloque.fin);
  const items: BorradorGasto[] = [];

  for (let i = 0; i < bloque.montos.length; i++) {
    const monto = bloque.montos[i];
    const desde = i === 0 ? bloque.inicio : bloque.montos[i - 1].fin;
    let fragmento = normalizado.slice(desde, monto.inicio);

    if (!tienePalabras(fragmento)) {
      const hasta =
        i + 1 < bloque.montos.length
          ? bloque.montos[i + 1].inicio
          : bloque.fin;
      fragmento = normalizado.slice(monto.fin, hasta);
    }

    items.push(crearItem(monto, fragmento, textoBloque, motivos, true));
  }

  return items;
}

export function parsearMensaje(texto: string): ResultadoParseo {
  const normalizado = normalizar(texto);
  const montos = detectarMontos(texto);
  const bloques = construirBloques(normalizado, montos);
  const motivos = new Set<MotivoRevision>();
  const items: BorradorGasto[] = [];

  for (const bloque of bloques) {
    items.push(...parsearBloque(bloque, normalizado, motivos));
  }

  return {
    textoOriginal: texto,
    items,
    requiereRevision: motivos.size > 0,
    motivos: Array.from(motivos),
  };
}
