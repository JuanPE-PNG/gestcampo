/**
 * Configuración global de la app.
 *
 * Decisiones congeladas del proyecto:
 * - Una sola moneda.
 * - Una sola caja (no se registra origen del dinero).
 * - Un solo centro de costo: la finca.
 */

export const APP_NAME = 'Gastos de Finca';

/**
 * Moneda única del sistema (ISO 4217).
 * Se define aquí para poder cambiarla en un solo lugar si hiciera falta.
 */
export const MONEDA = 'COP';

/** Nombre del archivo de la base de datos local. */
export const DB_NAME = 'gastos-finca.db';
