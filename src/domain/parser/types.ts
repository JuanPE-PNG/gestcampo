/**
 * Contrato del parser de mensajes (fase F1).
 *
 * El parser recibe el texto tal como lo escribe la persona y devuelve uno o
 * varios borradores de gasto. Nunca falla y nunca inventa: cuando no puede
 * interpretar algo con seguridad, lo deja en null y marca el motivo.
 *
 * Reglas del contrato:
 * - `montoMenor` está en centavos y es entero.
 * - `concepto` es el nombre del gasto, sin el monto ni cantidades.
 * - Si ningún criterio encaja, `categoriaId` es "otros" y `etiqueta` guarda el
 *   nombre exacto del gasto (ej.: "arroz"), para poder agruparlo después.
 * - `etiqueta` solo es obligatoria cuando la categoría es "otros".
 * - La confianza va de 0 a 1 y es por campo, no por ítem.
 */

/** Confianza por campo. 0 = no se pudo interpretar, 1 = certeza total. */
export type Confianza = {
  monto: number;
  concepto: number;
  categoria: number;
};

/** Motivos por los que un resultado queda pendiente de revisión. */
export type MotivoRevision =
  | 'sin-monto'
  | 'monto-ambiguo'
  | 'sin-concepto'
  | 'categoria-dudosa'
  | 'segmentacion-dudosa'
  | 'cantidad-ambigua';

/** Un gasto propuesto por el parser, todavía sin confirmar por la persona. */
export type BorradorGasto = {
  /** Monto en centavos. null si no se pudo determinar. */
  montoMenor: number | null;
  /** Nombre del gasto, normalizado (minúsculas, sin tildes). */
  concepto: string;
  /** Etiqueta libre para la categoría "otros". null en las demás. */
  etiqueta: string | null;
  /** Id de la categoría sugerida. "otros" cuando ninguna encaja. */
  categoriaId: string | null;
  /** Equipo afectado, si se menciona (tractor, motosierra, bomba...). */
  equipo: string | null;
  /** Cantidad, si se menciona explícitamente. */
  cantidad: number | null;
  /** Unidad de la cantidad (rollos, bultos, kilos...). */
  unidad: string | null;
  confianza: Confianza;
};

/** Resultado de interpretar un mensaje completo. */
export type ResultadoParseo = {
  textoOriginal: string;
  items: BorradorGasto[];
  /** true si al menos un ítem necesita que la persona lo revise. */
  requiereRevision: boolean;
  motivos: MotivoRevision[];
};

/** Firma que va a implementar el motor en las próximas sesiones. */
export type Parser = (texto: string) => ResultadoParseo;
