/**
 * Generador del corpus sintético del parser (F1).
 *
 * Uso: npm run corpus:generar
 *
 * Produce dos archivos estáticos y reproducibles:
 *   src/domain/parser/corpus-desarrollo.ts  (se usa para ajustar reglas)
 *   src/domain/parser/corpus-reserva.ts     (no se toca hasta el cierre)
 *
 * El generador compone los mensajes a partir de piezas ya estructuradas
 * (concepto, monto, categoría), así que el resultado esperado no depende de
 * la lógica del parser. Es importante: si el generador "adivinara" igual que
 * el parser, la medición no significaría nada.
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'src', 'domain', 'parser');

// ---------------------------------------------------------------------------
// Utilidades deterministas
// ---------------------------------------------------------------------------

function mulberry32(semilla) {
  let a = semilla;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mezclar(lista, rng) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function elegir(lista, rng) {
  return lista[Math.floor(rng() * lista.length)];
}

function elegirVarios(lista, rng, cantidad) {
  const copia = [...lista];
  const elegidos = [];
  while (elegidos.length < cantidad && copia.length > 0) {
    elegidos.push(copia.splice(Math.floor(rng() * copia.length), 1)[0]);
  }
  return elegidos;
}

// ---------------------------------------------------------------------------
// Normalización: lo que se espera del concepto va en minúsculas y sin tildes
// ---------------------------------------------------------------------------

const SIN_TILDE = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

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
]);

function palabras(texto) {
  return SIN_TILDE(texto)
    .split(/[^a-z0-9]+/)
    .filter((p) => p.length > 2 && !PALABRAS_VACIAS.has(p));
}

// ---------------------------------------------------------------------------
// Montos
// ---------------------------------------------------------------------------

const PRECIOS = [
  3000, 5000, 8000, 12000, 15000, 18000, 25000, 30000, 35000, 45000, 60000,
  75000, 80000, 90000, 120000, 150000, 250000, 500000,
];

const MESES = [
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
];

const PALABRAS_MONTO = [
  [2500, 'dos mil quinientos'],
  [5000, 'cinco mil'],
  [8000, 'ocho mil'],
  [12000, 'doce mil'],
  [15000, 'quince mil'],
  [25000, 'veinticinco mil'],
  [30000, 'treinta mil'],
  [45000, 'cuarenta y cinco mil'],
  [60000, 'sesenta mil'],
  [80000, 'ochenta mil'],
  [120000, 'ciento veinte mil'],
  [250000, 'doscientos cincuenta mil'],
  [500000, 'medio millón'],
];

const ARTICULO_EQUIPO = {
  tractor: 'el',
  motosierra: 'la',
  'bomba de agua': 'la',
  guadañadora: 'la',
  camioneta: 'la',
};

function articulo(equipo) {
  return ARTICULO_EQUIPO[equipo] ?? 'el';
}

const ESTILOS = ['miles', 'simbolo', 'plano', 'pesos', 'coma', 'mil'];

/** Rangos de precio por categoría, para que los montos sean creíbles. */
const RANGOS_PRECIO = {
  insumos: [8000, 120000],
  'reparacion-maquinaria': [25000, 500000],
  'reparacion-instrumental': [15000, 250000],
  'insumos-plantacion': [12000, 250000],
  otros: [3000, 120000],
};

function precioPara(item, rng) {
  const rango = RANGOS_PRECIO[item.categoria] ?? [3000, 500000];
  const opciones = PRECIOS.filter(
    (precio) => precio >= rango[0] && precio <= rango[1],
  );
  return elegir(opciones.length > 0 ? opciones : PRECIOS, rng);
}

function miles(numero) {
  return String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatearMonto(numero, estilo) {
  switch (estilo) {
    case 'simbolo':
      return `$${miles(numero)}`;
    case 'plano':
      return String(numero);
    case 'pesos':
      return `${miles(numero)} pesos`;
    case 'coma':
      return miles(numero).replace(/\./g, ',');
    case 'mil':
      return `${miles(numero / 1000)} mil`;
    default:
      return miles(numero);
  }
}

function estiloValido(rng) {
  const estilo = elegir(ESTILOS, rng);
  return estilo;
}

function monto(rng, estilo, item) {
  const precio = precioPara(item, rng);
  const efectivo =
    estilo === 'mil' && (precio % 1000 !== 0 || precio < 5000) ? 'miles' : estilo;
  return { precio, texto: formatearMonto(precio, efectivo) };
}

// ---------------------------------------------------------------------------
// Vocabulario
// ---------------------------------------------------------------------------

const ITEMS_DESARROLLO = [
  { concepto: 'aceite', categoria: 'insumos', equipo: 'tractor' },
  { concepto: 'filtro de aceite', categoria: 'insumos', equipo: 'tractor' },
  { concepto: 'bujías', categoria: 'insumos', equipo: 'motosierra' },
  { concepto: 'grasa', categoria: 'insumos', equipo: 'tractor' },
  { concepto: 'correa', categoria: 'insumos', equipo: 'bomba de agua' },
  { concepto: 'manguera', categoria: 'insumos', equipo: 'bomba de agua' },
  { concepto: 'tornillos', categoria: 'insumos', equipo: null },
  { concepto: 'reparación de bomba', categoria: 'reparacion-maquinaria', equipo: 'bomba de agua' },
  { concepto: 'soldadura', categoria: 'reparacion-maquinaria', equipo: 'tractor' },
  { concepto: 'cambio de manguera', categoria: 'reparacion-maquinaria', equipo: 'bomba de agua' },
  { concepto: 'reparación de motosierra', categoria: 'reparacion-maquinaria', equipo: 'motosierra' },
  { concepto: 'ajuste de motor', categoria: 'reparacion-maquinaria', equipo: 'guadañadora' },
  { concepto: 'abono', categoria: 'insumos-plantacion', equipo: null, unidad: 'bultos' },
  { concepto: 'urea', categoria: 'insumos-plantacion', equipo: null, unidad: 'bultos' },
  { concepto: 'alambre de púa', categoria: 'insumos-plantacion', equipo: null, unidad: 'rollos' },
  { concepto: 'semilla de maíz', categoria: 'insumos-plantacion', equipo: null, unidad: 'kilos' },
  { concepto: 'herbicida', categoria: 'insumos-plantacion', equipo: null, unidad: 'litros' },
  { concepto: 'cal', categoria: 'insumos-plantacion', equipo: null, unidad: 'bultos' },
  { concepto: 'arroz', categoria: 'otros', equipo: null, unidad: 'kilos' },
  { concepto: 'mercado', categoria: 'otros', equipo: null },
  { concepto: 'cemento', categoria: 'otros', equipo: null, unidad: 'bultos' },
  { concepto: 'veneno para ratas', categoria: 'otros', equipo: null },
  { concepto: 'pilas', categoria: 'otros', equipo: null, unidad: 'unidades' },
  { concepto: 'cuadernos', categoria: 'otros', equipo: null, unidad: 'unidades' },
];

const ITEMS_RESERVA = [
  { concepto: 'aceite hidráulico', categoria: 'insumos', equipo: 'tractor' },
  { concepto: 'filtro de combustible', categoria: 'insumos', equipo: 'tractor' },
  { concepto: 'cinta aislante', categoria: 'insumos', equipo: null },
  { concepto: 'llave de tuercas', categoria: 'insumos', equipo: null },
  { concepto: 'reparación de guadañadora', categoria: 'reparacion-maquinaria', equipo: 'guadañadora' },
  { concepto: 'cambio de correa', categoria: 'reparacion-maquinaria', equipo: 'tractor' },
  { concepto: 'fertilizante', categoria: 'insumos-plantacion', equipo: null, unidad: 'bultos' },
  { concepto: 'gallinaza', categoria: 'insumos-plantacion', equipo: null, unidad: 'bultos' },
  { concepto: 'postes', categoria: 'insumos-plantacion', equipo: null, unidad: 'unidades' },
  { concepto: 'semilla de pasto', categoria: 'insumos-plantacion', equipo: null, unidad: 'kilos' },
  { concepto: 'papas', categoria: 'otros', equipo: null, unidad: 'kilos' },
  { concepto: 'panela', categoria: 'otros', equipo: null, unidad: 'unidades' },
  { concepto: 'gasolina', categoria: 'otros', equipo: null, unidad: 'galones' },
  { concepto: 'cuerda', categoria: 'otros', equipo: null, unidad: 'rollos' },
  { concepto: 'bombillos', categoria: 'otros', equipo: null, unidad: 'unidades' },
];

// ---------------------------------------------------------------------------
// Construcción del resultado esperado
// ---------------------------------------------------------------------------

function esperado(item, pesos, extra = {}) {
  const resultado = {
    montoMenor: pesos === null ? null : pesos * 100,
    conceptoContiene: palabras(item.concepto),
    categoriaId: item.categoria,
  };

  if (item.categoria === 'otros') {
    resultado.etiquetaContiene = palabras(item.concepto);
  }
  if (extra.equipo) {
    resultado.equipo = extra.equipo;
  }
  if (extra.cantidad !== undefined) {
    resultado.cantidad = extra.cantidad;
  }
  if (extra.unidad) {
    resultado.unidad = extra.unidad;
  }

  return resultado;
}

// ---------------------------------------------------------------------------
// Plantillas
// ---------------------------------------------------------------------------

const PLANTILLAS = {
  final({ item, rng }) {
    const estilo = estiloValido(rng);
    const { precio, texto } = monto(rng, estilo, item);
    return {
      texto: `${item.concepto} ${texto}`,
      items: [esperado(item, precio)],
      requiereRevision: false,
    };
  },

  inicio({ item, rng }) {
    const estilo = estiloValido(rng);
    const { precio, texto } = monto(rng, estilo, item);
    return {
      texto: `${texto} ${item.concepto}`,
      items: [esperado(item, precio)],
      requiereRevision: false,
    };
  },

  equipoPrimero({ item, rng }) {
    const estilo = estiloValido(rng);
    const { precio, texto } = monto(rng, estilo, item);
    return {
      texto: `${item.equipo} ${item.concepto} ${texto}`,
      items: [esperado(item, precio, { equipo: item.equipo })],
      requiereRevision: false,
    };
  },

  paraEquipo({ item, rng }) {
    const estilo = estiloValido(rng);
    const { precio, texto } = monto(rng, estilo, item);
    return {
      texto: `${item.concepto} para ${articulo(item.equipo)} ${item.equipo} ${texto}`,
      items: [esperado(item, precio, { equipo: item.equipo })],
      requiereRevision: false,
    };
  },

  cantidadTotal({ item, rng }) {
    const estilo = estiloValido(rng);
    const { precio, texto } = monto(rng, estilo, item);
    const cantidad = 2 + Math.floor(rng() * 4);
    return {
      texto: `${cantidad} ${item.unidad} de ${item.concepto} ${texto}`,
      items: [esperado(item, precio, { cantidad, unidad: item.unidad })],
      requiereRevision: false,
    };
  },

  cantidadUnitario({ item, rng }) {
    const estilo = estiloValido(rng);
    const { precio, texto } = monto(rng, estilo, item);
    const cantidad = 2 + Math.floor(rng() * 4);
    return {
      texto: `${cantidad} ${item.unidad} de ${item.concepto} a ${texto} c/u`,
      items: [esperado(item, precio * cantidad, { cantidad, unidad: item.unidad })],
      requiereRevision: false,
    };
  },

  multi({ items, rng }) {
    const cantidad = rng() < 0.5 ? 2 : 3;
    const elegidos = elegirVarios(items, rng, cantidad);
    const partes = elegidos.map((item) => {
      const estilo = estiloValido(rng);
      const { precio, texto } = monto(rng, estilo, item);
      return { item, precio, texto: `${item.concepto} ${texto}` };
    });
    const textos = partes.map((parte) => parte.texto);
    const unido =
      textos.length === 2
        ? `${textos[0]} y ${textos[1]}`
        : `${textos.slice(0, -1).join(', ')} y ${textos[textos.length - 1]}`;

    return {
      texto: unido,
      items: partes.map((parte) => esperado(parte.item, parte.precio)),
      requiereRevision: false,
    };
  },

  multiSinSeparador({ items, rng }) {
    const [a, b] = elegirVarios(items, rng, 2);
    const styleA = estiloValido(rng);
    const styleB = estiloValido(rng);
    const montoA = monto(rng, styleA, a);
    const montoB = monto(rng, styleB, b);
    return {
      texto: `${a.concepto} ${montoA.texto} ${b.concepto} ${montoB.texto}`,
      items: [esperado(a, montoA.precio), esperado(b, montoB.precio)],
      requiereRevision: true,
    };
  },

  sinMonto({ item }) {
    const palabrasEquipo = palabras(item.equipo ?? '');
    const palabrasConcepto = palabras(item.concepto);
    const mencionaEquipo =
      Boolean(item.equipo) &&
      !palabrasEquipo.some((palabra) => palabrasConcepto.includes(palabra));

    return {
      texto: mencionaEquipo
        ? `${item.concepto} para ${articulo(item.equipo)} ${item.equipo}`
        : item.concepto,
      items: [esperado(item, null, mencionaEquipo ? { equipo: item.equipo } : {})],
      requiereRevision: true,
    };
  },

  voz({ item, rng }) {
    const [pesos, texto] = elegir(PALABRAS_MONTO, rng);
    const conEquipo = Boolean(item.equipo);
    return {
      texto: `eh... compré ${item.concepto}${conEquipo ? ` para ${articulo(item.equipo)} ${item.equipo}` : ''}, ${texto}`,
      items: [esperado(item, pesos, conEquipo ? { equipo: item.equipo } : {})],
      requiereRevision: false,
    };
  },

  fecha({ item, rng }) {
    const estilo = estiloValido(rng);
    const { precio, texto } = monto(rng, estilo, item);
    const dia = 1 + Math.floor(rng() * 28);
    const mes = elegir(MESES, rng);
    return {
      texto: `el ${dia} de ${mes} compré ${item.concepto} ${texto}`,
      items: [esperado(item, precio)],
      requiereRevision: false,
    };
  },
};

function requiereItem(item, plantilla) {
  if (['equipoPrimero', 'paraEquipo'].includes(plantilla)) {
    if (!item.equipo) return false;
    // Evita "bomba de agua reparación de bomba" y similares.
    const palabrasEquipo = palabras(item.equipo);
    const palabrasConcepto = palabras(item.concepto);
    return !palabrasEquipo.some((palabra) => palabrasConcepto.includes(palabra));
  }
  if (['cantidadTotal', 'cantidadUnitario'].includes(plantilla)) {
    return Boolean(item.unidad);
  }
  return true;
}

function elegirItem(items, indice, plantilla) {
  for (let salto = 0; salto < items.length; salto++) {
    const item = items[(indice + salto) % items.length];
    if (requiereItem(item, plantilla)) return item;
  }
  return items[indice % items.length];
}

// ---------------------------------------------------------------------------
// Generación
// ---------------------------------------------------------------------------

function generar({ prefijo, cantidad, semilla, items, mix }) {
  const rng = mulberry32(semilla);
  const pool = mezclar(items, rng);
  const orden = mezclar(mix, rng);
  const casos = [];
  const textos = new Set();
  let indice = 0;
  let intentos = 0;

  while (casos.length < cantidad && intentos < cantidad * 50) {
    intentos++;
    const pedida = orden[casos.length % orden.length];
    const item = elegirItem(pool, indice, pedida);
    indice++;

    const plantilla = requiereItem(item, pedida) ? pedida : 'final';
    const resultado = PLANTILLAS[plantilla]({ item, items: pool, rng });

    if (textos.has(resultado.texto)) continue;
    textos.add(resultado.texto);

    casos.push({
      id: `${prefijo}-${String(casos.length + 1).padStart(3, '0')}`,
      texto: resultado.texto,
      plantilla,
      esperado: {
        items: resultado.items,
        requiereRevision: resultado.requiereRevision,
      },
    });
  }

  if (casos.length < cantidad) {
    throw new Error(`No se pudieron generar ${cantidad} casos (${casos.length}).`);
  }

  return casos;
}

const MIX_DESARROLLO = [
  ...Array(16).fill('final'),
  ...Array(10).fill('inicio'),
  ...Array(10).fill('equipoPrimero'),
  ...Array(10).fill('paraEquipo'),
  ...Array(14).fill('cantidadTotal'),
  ...Array(12).fill('cantidadUnitario'),
  ...Array(16).fill('multi'),
  ...Array(8).fill('multiSinSeparador'),
  ...Array(8).fill('sinMonto'),
  ...Array(8).fill('voz'),
  ...Array(8).fill('fecha'),
];

const MIX_RESERVA = [
  ...Array(8).fill('final'),
  ...Array(4).fill('inicio'),
  ...Array(5).fill('equipoPrimero'),
  ...Array(4).fill('paraEquipo'),
  ...Array(6).fill('cantidadTotal'),
  ...Array(5).fill('cantidadUnitario'),
  ...Array(6).fill('multi'),
  ...Array(3).fill('multiSinSeparador'),
  ...Array(3).fill('sinMonto'),
  ...Array(3).fill('voz'),
  ...Array(3).fill('fecha'),
];

const desarrollo = generar({
  prefijo: 'dev',
  cantidad: 120,
  semilla: 20261120,
  items: ITEMS_DESARROLLO,
  mix: MIX_DESARROLLO,
});

const reserva = generar({
  prefijo: 'res',
  cantidad: 50,
  semilla: 771231,
  items: ITEMS_RESERVA,
  mix: MIX_RESERVA,
});

function escribir(archivo, variable, casos) {
  const contenido =
    '// Generado por scripts/generar-corpus.mjs. No editar a mano.\n' +
    '// Regenerar con: npm run corpus:generar\n\n' +
    "import type { CasoParser } from './corpus-types';\n\n" +
    `export const ${variable}: CasoParser[] = ${JSON.stringify(casos, null, 2)};\n`;

  writeFileSync(join(SALIDA, archivo), contenido, 'utf8');
}

escribir('corpus-desarrollo.ts', 'CASOS_DESARROLLO', desarrollo);
escribir('corpus-reserva.ts', 'CASOS_RESERVA', reserva);

console.log(`Corpus generado: ${desarrollo.length} desarrollo, ${reserva.length} reserva.`);
