import { CASOS_DESARROLLO } from './corpus-desarrollo';
import { formatearReporte, medirMontos } from './medir-montos';

/**
 * Medición de montos sobre el corpus de desarrollo.
 *
 * El corpus de reserva no se mide acá a propósito: se evalúa recién al
 * cierre de F1, para no ajustar las reglas contra él.
 */
describe('extracción de montos (corpus de desarrollo)', () => {
  const resultado = medirMontos(CASOS_DESARROLLO);

  if (process.env.PARSER_REPORTE === '1') {
    console.log(formatearReporte(resultado));
  }

  it('alcanza al menos 95% de coincidencia exacta', () => {
    if (resultado.exactitud < 0.95) {
      throw new Error(
        `Exactitud insuficiente (${(resultado.exactitud * 100).toFixed(1)}%)\n${formatearReporte(resultado)}`,
      );
    }

    expect(resultado.exactitud).toBeGreaterThanOrEqual(0.95);
  });

  it('no falla en los casos con un solo monto', () => {
    const fallasSimples = resultado.fallas.filter((falla) => falla.esperado.length <= 1);
    expect(fallasSimples).toEqual([]);
  });
});
