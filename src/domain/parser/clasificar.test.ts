import { clasificarConcepto } from './clasificar';

const casos: [string, string, number][] = [
  ['aceite', 'insumos', 0.95],
  ['filtro de aceite', 'insumos', 0.95],
  ['tornillos', 'insumos', 0.95],
  ['reparacion de bomba', 'reparacion-maquinaria', 0.95],
  ['cambio de manguera', 'reparacion-maquinaria', 0.95],
  ['soldadura tractor', 'reparacion-maquinaria', 0.95],
  ['alambre de pua', 'insumos-plantacion', 0.95],
  ['abono', 'insumos-plantacion', 0.95],
  ['cal', 'insumos-plantacion', 0.95],
  ['arroz', 'otros', 0.6],
  ['mercado', 'otros', 0.6],
  ['veneno para ratas', 'otros', 0.6],
];

describe('clasificarConcepto', () => {
  it.each(casos)('%s → %s', (concepto, categoria, confianza) => {
    const resultado = clasificarConcepto(concepto);
    expect(resultado.categoriaId).toBe(categoria);
    expect(resultado.confianza).toBe(confianza);

    if (categoria === 'otros') {
      expect(resultado.etiqueta).toBe(concepto);
    } else {
      expect(resultado.etiqueta).toBeNull();
    }
  });

  it('no inventa etiqueta si el concepto está vacío', () => {
    const resultado = clasificarConcepto('');
    expect(resultado.categoriaId).toBe('otros');
    expect(resultado.etiqueta).toBeNull();
  });
});
