/**
 * Categorías fijas para el spike del parser (F1).
 *
 * En la app real las categorías las crea el usuario. Estas cinco existen solo
 * para poder medir la clasificación durante F1. "otros" es obligatoria.
 *
 * Semántica usada en el corpus:
 * - insumos: insumos generales de operación (aceite, filtros, bujías).
 * - reparacion-maquinaria: reparaciones de máquinas y equipos.
 * - reparacion-instrumental: reparaciones de instrumental menor.
 * - insumos-plantacion: lo que se aplica o instala en el cultivo.
 * - otros: todo lo que no encaja; lleva etiqueta con el nombre del gasto.
 */

export const CATEGORIA_OTROS = 'otros';

export const CATEGORIAS_PRUEBA = [
  { id: 'insumos', nombre: 'Insumos' },
  { id: 'reparacion-maquinaria', nombre: 'Reparación de maquinaria' },
  { id: 'reparacion-instrumental', nombre: 'Reparación de instrumental' },
  { id: 'insumos-plantacion', nombre: 'Insumos de plantación' },
  { id: CATEGORIA_OTROS, nombre: 'Otros' },
] as const;

export type CategoriaPruebaId = (typeof CATEGORIAS_PRUEBA)[number]['id'];
