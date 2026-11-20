import { CASOS_DESARROLLO } from './corpus-desarrollo';
import {
  formatearReporteEstructura,
  medirEstructura,
} from './medir-estructura';

/**
 * Estructura completa sobre el corpus de desarrollo.
 * Nuevamente: el corpus de reserva y los adversarios se miden al cierre.
 */
describe('estructura del gasto (corpus de desarrollo)', () => {
  const resultado = medirEstructura(CASOS_DESARROLLO);

  if (process.env.PARSER_REPORTE === '1') {
    console.log(formatearReporteEstructura(resultado));
  }

  it('alcanza al menos 90% de coincidencia exacta', () => {
    if (resultado.exactitud < 0.9) {
      throw new Error(
        `Estructura insuficiente (${(resultado.exactitud * 100).toFixed(1)}%)\n${formatearReporteEstructura(resultado)}`,
      );
    }

    expect(resultado.exactitud).toBeGreaterThanOrEqual(0.9);
  });
});
