import { CATEGORIAS_PRUEBA } from './categorias-prueba';
import { CASOS_ADVERSARIOS } from './corpus-adversarios';
import { CASOS_DESARROLLO } from './corpus-desarrollo';
import { CASOS_RESERVA } from './corpus-reserva';
import type { CasoParser } from './corpus-types';

/**
 * Pruebas de integridad del corpus del parser.
 *
 * No prueban el parser: prueban que el material con el que se va a medir sea
 * confiable. Un corpus con casos duplicados, montos inválidos o categorías
 * inexistentes produce métricas que no significan nada.
 */

const TODOS: CasoParser[] = [
  ...CASOS_ADVERSARIOS,
  ...CASOS_DESARROLLO,
  ...CASOS_RESERVA,
];

const IDS_CATEGORIA = new Set<string>(CATEGORIAS_PRUEBA.map((c) => c.id));

describe('integridad del corpus', () => {
  it('reúne los tres conjuntos con sus tamaños esperados', () => {
    expect(CASOS_ADVERSARIOS).toHaveLength(27);
    expect(CASOS_DESARROLLO).toHaveLength(120);
    expect(CASOS_RESERVA).toHaveLength(50);
  });

  it('no repite identificadores', () => {
    const ids = TODOS.map((caso) => caso.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('no repite textos', () => {
    const textos = TODOS.map((caso) => caso.texto);
    expect(new Set(textos).size).toBe(textos.length);
  });

  it('no comparte textos entre desarrollo y reserva', () => {
    const reserva = new Set(CASOS_RESERVA.map((caso) => caso.texto));
    const repetidos = CASOS_DESARROLLO.filter((caso) => reserva.has(caso.texto));
    expect(repetidos).toEqual([]);
  });

  it('cada caso tiene al menos un gasto esperado', () => {
    for (const caso of TODOS) {
      expect(caso.esperado.items.length).toBeGreaterThan(0);
    }
  });

  it('todo gasto esperado tiene palabras de concepto', () => {
    for (const caso of TODOS) {
      for (const item of caso.esperado.items) {
        expect(item.conceptoContiene.length).toBeGreaterThan(0);
      }
    }
  });

  it('los montos son enteros positivos o null', () => {
    for (const caso of TODOS) {
      for (const item of caso.esperado.items) {
        if (item.montoMenor === null) continue;
        expect(Number.isSafeInteger(item.montoMenor)).toBe(true);
        expect(item.montoMenor).toBeGreaterThan(0);
      }
    }
  });

  it('solo usa categorías que existen', () => {
    for (const caso of TODOS) {
      for (const item of caso.esperado.items) {
        if (item.categoriaId === undefined || item.categoriaId === null) continue;
        expect(IDS_CATEGORIA.has(item.categoriaId)).toBe(true);
      }
    }
  });

  it('la categoría Otros siempre lleva etiqueta', () => {
    for (const caso of TODOS) {
      for (const item of caso.esperado.items) {
        if (item.categoriaId !== 'otros') continue;
        expect(item.etiquetaContiene?.length ?? 0).toBeGreaterThan(0);
      }
    }
  });

  it('un monto desconocido siempre exige revisión', () => {
    for (const caso of TODOS) {
      const hayMontoDesconocido = caso.esperado.items.some(
        (item) => item.montoMenor === null,
      );
      if (hayMontoDesconocido) {
        expect(caso.esperado.requiereRevision).toBe(true);
      }
    }
  });

  it('una segmentación dudosa siempre exige revisión', () => {
    for (const caso of TODOS) {
      if (caso.plantilla === 'multiSinSeparador') {
        expect(caso.esperado.requiereRevision).toBe(true);
      }
    }
  });
});
