import { formatearMonto, parsearMonto } from './money';

describe('parsearMonto', () => {
  it.each([
    ['45000', 4_500_000],
    ['45.000', 4_500_000],
    ['45.000,50', 4_500_050],
    ['1.234,56', 123_456],
    ['1,234.56', 123_456],
    ['$ 87.500', 8_750_000],
    ['0,75', 75],
    ['1.234.567', 123_456_700],
    ['-2.500', -250_000],
  ])('interpreta %s como %i unidades menores', (entrada, esperado) => {
    expect(parsearMonto(entrada)).toBe(esperado);
  });

  it.each(['', '   ', 'abc', '1.2345', '12.'])('rechaza %p', (entrada) => {
    expect(parsearMonto(entrada)).toBeNull();
  });
});

describe('formatearMonto', () => {
  it('muestra el monto con separador de miles', () => {
    expect(formatearMonto(4_500_000)).toContain('45.000');
  });

  it('conserva los centavos cuando existen', () => {
    expect(formatearMonto(4_500_050)).toContain('45.000,50');
  });
});
