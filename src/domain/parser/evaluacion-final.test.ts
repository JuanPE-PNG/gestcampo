import { CASOS_ADVERSARIOS } from './corpus-adversarios';
import { CASOS_RESERVA } from './corpus-reserva';
import {
  formatearReporteEstructura,
  medirEstructura,
} from './medir-estructura';
import { medirMontos } from './medir-montos';

/**
 * Evaluación final de F1.
 *
 * La reserva y los adversarios no se usaron para ajustar reglas: esta es la
 * primera medición y los umbrales quedan como línea base contra regresiones.
 */

const reserva = medirEstructura(CASOS_RESERVA);
const adversarios = medirEstructura(CASOS_ADVERSARIOS);
const montosReserva = medirMontos(CASOS_RESERVA);
const montosAdversarios = medirMontos(CASOS_ADVERSARIOS);

if (process.env.PARSER_REPORTE === '1') {
  console.log('=== RESERVA ===');
  console.log(formatearReporteEstructura(reserva));
  console.log(`Montos reserva: ${montosReserva.exactos}/${montosReserva.total}`);
  console.log('');
  console.log('=== ADVERSARIOS ===');
  console.log(formatearReporteEstructura(adversarios));
  console.log(
    `Montos adversarios: ${montosAdversarios.exactos}/${montosAdversarios.total}`,
  );
}

describe('evaluación final de F1', () => {
  it('la reserva mantiene la estructura esperada', () => {
    expect(reserva.exactitud).toBeGreaterThanOrEqual(0.95);
  });

  it('la reserva mantiene las categorías esperadas', () => {
    expect(reserva.categorias.exactitud).toBeGreaterThanOrEqual(0.95);
  });

  it('los adversarios mantienen la estructura esperada', () => {
    expect(adversarios.exactitud).toBeGreaterThanOrEqual(0.85);
  });

  it('los adversarios mantienen las categorías esperadas', () => {
    expect(adversarios.categorias.exactitud).toBeGreaterThanOrEqual(0.9);
  });

  it('los montos de la reserva se mantienen', () => {
    expect(montosReserva.exactitud).toBeGreaterThanOrEqual(0.95);
  });

  it('los montos de los adversarios se mantienen', () => {
    expect(montosAdversarios.exactitud).toBeGreaterThanOrEqual(0.9);
  });
});
