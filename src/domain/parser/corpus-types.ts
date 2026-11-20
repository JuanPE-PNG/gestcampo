import type { CategoriaPruebaId } from './categorias-prueba';

/**
 * Un gasto esperado dentro de un caso del corpus.
 *
 * Las palabras de `conceptoContiene` y `etiquetaContiene` van normalizadas:
 * minúsculas y sin tildes. Así la comparación no depende de cómo se escriba.
 */
export type GastoEsperado = {
  montoMenor: number | null;
  conceptoContiene: string[];
  /**
   * undefined: no se evalúa.
   * null: el parser no debe sugerir ninguna categoría.
   * string: debe sugerir exactamente esa.
   */
  categoriaId?: CategoriaPruebaId | null;
  /** Palabras que debe contener la etiqueta (solo cuando la categoría es "otros"). */
  etiquetaContiene?: string[];
  equipo?: string | null;
  cantidad?: number | null;
  unidad?: string | null;
};

export type CasoParser = {
  id: string;
  texto: string;
  /** Plantilla que generó el caso (solo en el corpus generado). */
  plantilla?: string;
  esperado: {
    items: GastoEsperado[];
    requiereRevision: boolean;
  };
  nota?: string;
};
