import { parsearMensaje } from './parser';

function unico(texto: string) {
  const resultado = parsearMensaje(texto);
  expect(resultado.items).toHaveLength(1);
  return { resultado, item: resultado.items[0] };
}

describe('parsearMensaje', () => {
  it('interpreta un gasto simple', () => {
    const { item, resultado } = unico('aceite 45.000');
    expect(item.montoMenor).toBe(4_500_000);
    expect(item.concepto).toBe('aceite');
    expect(resultado.requiereRevision).toBe(false);
  });

  it('separa varios gastos por coma y conjunción', () => {
    const resultado = parsearMensaje(
      'aceite 45.000, filtro 30.000 y bujías 12.500',
    );
    expect(resultado.items.map((item) => item.montoMenor)).toEqual([
      4_500_000, 3_000_000, 1_250_000,
    ]);
    expect(resultado.items.map((item) => item.concepto)).toEqual([
      'aceite',
      'filtro',
      'bujias',
    ]);
    expect(resultado.requiereRevision).toBe(false);
  });

  it('multiplica cantidad por precio unitario', () => {
    const { item } = unico('3 rollos de alambre de púa a 29.000 c/u');
    expect(item.montoMenor).toBe(8_700_000);
    expect(item.cantidad).toBe(3);
    expect(item.unidad).toBe('rollos');
    expect(item.concepto).toContain('alambre');
  });

  it('mantiene el monto total cuando no dice c/u', () => {
    const { item } = unico('2 bultos de urea 120.000');
    expect(item.montoMenor).toBe(12_000_000);
    expect(item.cantidad).toBe(2);
    expect(item.unidad).toBe('bultos');
  });

  it('interpreta un gasto de Otros con cantidad', () => {
    const { item } = unico('2 kilos de arroz por 5 mil pesos');
    expect(item.montoMenor).toBe(500_000);
    expect(item.concepto).toBe('arroz');
    expect(item.cantidad).toBe(2);
    expect(item.categoriaId).toBe('otros');
    expect(item.etiqueta).toBe('arroz');
    expect(item.confianza.categoria).toBe(0.6);
  });

  it('clasifica un insumo sin etiqueta', () => {
    const { item } = unico('aceite 45.000');
    expect(item.categoriaId).toBe('insumos');
    expect(item.etiqueta).toBeNull();
    expect(item.confianza.categoria).toBe(0.95);
  });

  it('prioriza reparación sobre insumo', () => {
    const { item } = unico('cambio de manguera 30.000');
    expect(item.categoriaId).toBe('reparacion-maquinaria');
  });

  it('detecta el equipo al inicio', () => {
    const { item } = unico('tractor aceite 45.000');
    expect(item.concepto).toBe('aceite');
    expect(item.equipo).toBe('tractor');
  });

  it('no toma la fecha como monto', () => {
    const { item } = unico('el 12 de marzo compré alambre 87.500');
    expect(item.montoMenor).toBe(8_750_000);
    expect(item.concepto).toBe('alambre');
  });

  it('exige revisión cuando no hay monto', () => {
    const { item, resultado } = unico('revisar la bomba de agua');
    expect(item.montoMenor).toBeNull();
    expect(resultado.requiereRevision).toBe(true);
  });

  it('une la nota de voz con su monto', () => {
    const { item } = unico(
      'eh... compré aceite para el tractor, cuarenta y cinco mil',
    );
    expect(item.montoMenor).toBe(4_500_000);
    expect(item.concepto).toBe('aceite');
    expect(item.equipo).toBe('tractor');
  });

  it('marca revisión cuando hay dos gastos sin separador', () => {
    const resultado = parsearMensaje('aceite 45.000 filtro 30.000');
    expect(resultado.items.map((item) => item.montoMenor)).toEqual([
      4_500_000, 3_000_000,
    ]);
    expect(resultado.requiereRevision).toBe(true);
  });
});
