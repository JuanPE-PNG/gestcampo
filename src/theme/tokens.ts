/**
 * Tokens visuales de la app.
 *
 * Criterio: uso en exterior, con luz de día y una sola mano.
 * - Alto contraste.
 * - Tipografía grande.
 * - Áreas táctiles amplias.
 *
 * La app es de tema claro únicamente. El modo oscuro no es un requisito.
 */

export const colors = {
  background: '#F5F6F2',
  surface: '#FFFFFF',
  text: '#14181C',
  textMuted: '#5B6670',
  border: '#DCE1E4',
  primary: '#14532D',
  onPrimary: '#FFFFFF',
  success: '#15803D',
  warning: '#B45309',
  danger: '#B91C1C',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

export const fontSize = {
  caption: 12,
  body: 16,
  subtitle: 18,
  title: 24,
  display: 30,
} as const;

/** Altura mínima de un control táctil. */
export const touchTarget = 48;
