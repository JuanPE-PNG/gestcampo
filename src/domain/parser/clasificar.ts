/**
 * Clasificación de conceptos en categorías (F1, sesión 5).
 *
 * En la app real las categorías las crea el usuario. Acá se usan las cinco
 * fijas del spike y un conjunto de palabras clave.
 *
 * Reglas:
 * - Se evalúa por prioridad: una reparación gana sobre un insumo, aunque el
 *   texto mencione ambos ("cambio de manguera" es reparación, no insumo).
 * - Si ninguna palabra clave coincide, el gasto va a "otros" y se guarda una
 *   etiqueta con el nombre exacto del gasto.
 * - La confianza es alta cuando hay coincidencia y baja cuando es el respaldo.
 */

import type { CategoriaPruebaId } from './categorias-prueba';
import { CATEGORIA_OTROS } from './categorias-prueba';

type Regla = {
  categoria: CategoriaPruebaId;
  palabras: string[];
};

/** El orden es la prioridad: primero reparaciones, después insumos. */
const REGLAS: Regla[] = [
  {
    categoria: 'reparacion-maquinaria',
    palabras: [
      'reparacion',
      'reparar',
      'soldadura',
      'ajuste',
      'cambio',
      'arreglo',
      'motor',
    ],
  },
  {
    categoria: 'reparacion-instrumental',
    palabras: ['instrumental', 'instrumento', 'calibracion', 'valvula'],
  },
  {
    categoria: 'insumos-plantacion',
    palabras: [
      'abono',
      'urea',
      'alambre',
      'semilla',
      'herbicida',
      'fertilizante',
      'gallinaza',
      'poste',
      'postes',
      'cal',
      'foliar',
    ],
  },
  {
    categoria: 'insumos',
    palabras: [
      'aceite',
      'filtro',
      'bujia',
      'bujias',
      'grasa',
      'correa',
      'manguera',
      'tornillo',
      'tornillos',
      'cinta',
      'llave',
      'combustible',
    ],
  },
];

export type SugerenciaCategoria = {
  categoriaId: CategoriaPruebaId;
  /** Solo para "otros": nombre exacto del gasto. */
  etiqueta: string | null;
  confianza: number;
};

export function clasificarConcepto(concepto: string): SugerenciaCategoria {
  const normalizado = concepto.trim();
  const palabras = new Set(normalizado.split(/\s+/).filter(Boolean));

  for (const regla of REGLAS) {
    const coincide = regla.palabras.some((palabra) => palabras.has(palabra));
    if (coincide) {
      return { categoriaId: regla.categoria, etiqueta: null, confianza: 0.95 };
    }
  }

  return {
    categoriaId: CATEGORIA_OTROS,
    etiqueta: normalizado || null,
    confianza: 0.6,
  };
}
