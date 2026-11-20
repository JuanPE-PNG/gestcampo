import { valorDeSecuencia } from './numeros';

const casos: [string[], number][] = [
  [['mil'], 1_000],
  [['dos', 'mil'], 2_000],
  [['dos', 'mil', 'quinientos'], 2_500],
  [['cuarenta', 'y', 'cinco', 'mil'], 45_000],
  [['ciento', 'veinte', 'mil'], 120_000],
  [['doscientos', 'cincuenta', 'mil'], 250_000],
  [['medio', 'millon'], 500_000],
  [['dos'], 2],
];

describe('valorDeSecuencia', () => {
  it.each(casos)('%s', (palabras, esperado) => {
    expect(valorDeSecuencia(palabras)).toBe(esperado);
  });
});
