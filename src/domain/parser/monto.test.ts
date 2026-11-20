import { detectarMontos } from './monto';

const valores = (texto: string) => detectarMontos(texto).map((monto) => monto.valorMenor);

const casos: [string, number[]][] = [
  ['aceite 45.000', [4_500_000]],
  ['1.500 de alambre', [150_000]],
  ['45.000,50 de aceite', [4_500_050]],
  ['$87.500 de filtro', [8_750_000]],
  ['45,000 de alambre', [4_500_000]],
  ['120 mil grasa', [12_000_000]],
  ['5 mil pesos', [500_000]],
  ['dos mil quinientos', [250_000]],
  ['cuarenta y cinco mil', [4_500_000]],
  ['medio millón', [50_000_000]],
  ['el 12 de marzo compré alambre 87.500', [8_750_000]],
  ['2 kilos de arroz por 5 mil pesos', [500_000]],
  ['3 rollos de alambre a 29.000 c/u', [2_900_000]],
  ['aceite 20w50 p tractor 45.000', [4_500_000]],
  ['revisar la bomba de agua', []],
  ['3 bultos de cemento 90.000', [9_000_000]],
  ['5 unidades de cuadernos a $500.000 c/u', [50_000_000]],
  ['aceite 45.000, filtro 30.000 y bujías 12.500', [4_500_000, 3_000_000, 1_250_000]],
];

describe('detectarMontos', () => {
  it.each(casos)('%s', (texto, esperado) => {
    expect(valores(texto)).toEqual(esperado);
  });

  it('marca el precio unitario cuando dice c/u', () => {
    const [monto] = detectarMontos('3 rollos de alambre a 29.000 c/u');
    expect(monto.esPrecioUnitario).toBe(true);
  });

  it('no marca precio unitario cuando el monto es total', () => {
    const [monto] = detectarMontos('2 bultos de urea 120.000');
    expect(monto.esPrecioUnitario).toBe(false);
  });
});
