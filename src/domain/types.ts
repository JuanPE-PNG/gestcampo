/**
 * Tipos del dominio.
 *
 * Reglas que estos tipos reflejan (no cambiar sin actualizar la memoria):
 * - Un mensaje es inmutable: nunca se edita ni se borra.
 * - Todo gasto nace de un mensaje (las cargas manuales generan uno sintético).
 * - El dinero se guarda en unidades menores enteras (centavos).
 * - Una fecha de negocio es un día local en formato YYYY-MM-DD.
 * - No hay cierre de días: cualquier fecha pasada es editable.
 */

export type ID = string;

/** Día local del gasto, en formato YYYY-MM-DD. */
export type FechaLocal = string;

/** Instante exacto en ISO 8601 (UTC). */
export type InstanteISO = string;

/** Estado del gasto dentro del flujo de revisión. */
export type EstadoCiclo = 'propuesto' | 'revisado' | 'anulado';

/** Estado del gasto frente a la copia en la nube. */
export type EstadoSincronizacion = 'local' | 'en_cola' | 'sincronizado' | 'error';

export type TipoMensaje = 'texto' | 'audio';

export type EstadoParseo = 'pendiente' | 'interpretado' | 'con_error';

export interface Mensaje {
  id: ID;
  deviceId: string;
  creadoEn: InstanteISO;
  tipo: TipoMensaje;
  /** Texto original. Para audios, la transcripción cuando exista. */
  texto: string;
  /** Ruta local del audio, si aplica. */
  audioUri: string | null;
  estadoParseo: EstadoParseo;
}

export interface Categoria {
  id: ID;
  nombre: string;
  orden: number;
  /** “Otros”: no se puede borrar y recibe los gastos de categorías eliminadas. */
  esRespaldo: boolean;
  creadoEn: InstanteISO;
}

export interface Gasto {
  id: ID;
  /** Mensaje que le dio origen. Nunca nulo. */
  mensajeId: ID;
  fecha: FechaLocal;
  creadoEn: InstanteISO;
  actualizadoEn: InstanteISO;
  /** Monto en unidades menores (centavos). Entero. */
  montoMenor: number;
  moneda: string;
  concepto: string;
  categoriaId: ID | null;
  /** Equipo afectado, texto libre (tractor, bomba, etc.). */
  equipo: string | null;
  nota: string | null;
  estadoCiclo: EstadoCiclo;
  estadoSync: EstadoSincronizacion;
  /** Sube con cada edición; sirve para resolver conflictos de sincronización. */
  version: number;
}

export interface DiaResumen {
  fecha: FechaLocal;
  totalMenor: number;
  cantidadGastos: number;
  cantidadSinCategoria: number;
  cantidadSinRevisar: number;
}
