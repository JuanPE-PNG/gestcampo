import type { CasoParser } from './corpus-types';

/**
 * Casos adversarios del parser (F1).
 *
 * Están escritos a mano y se evalúan al cierre de la fase, no durante el
 * ajuste de reglas. Si para pasar uno hay que escribir una regla dedicada,
 * se anota como sobreajuste en la decisión final.
 *
 * Los montos están en centavos: 45.000 pesos = 4_500_000.
 */
export const CASOS_ADVERSARIOS: CasoParser[] = [
  {
    id: 'sin-monto-bomba',
    texto: 'revisar la bomba de agua',
    nota: 'No hay monto: debe quedar para revisar, sin inventar cifras.',
    esperado: {
      items: [{ montoMenor: null, conceptoContiene: ['bomba', 'agua'] }],
      requiereRevision: true,
    },
  },
  {
    id: 'monto-palabras-mil',
    texto: 'aceite para el tractor 45 mil',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
          equipo: 'tractor',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'monto-palabras-medio-millon',
    texto: 'repuestos para la motosierra medio millón',
    esperado: {
      items: [
        {
          montoMenor: 50_000_000,
          conceptoContiene: ['repuestos'],
          categoriaId: 'reparacion-maquinaria',
          equipo: 'motosierra',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'monto-palabras-compuesto',
    texto: 'abono dos mil quinientos',
    esperado: {
      items: [
        {
          montoMenor: 250_000,
          conceptoContiene: ['abono'],
          categoriaId: 'insumos-plantacion',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'multi-item-comas',
    texto: 'aceite 45.000, filtro 30.000 y bujías 12.500',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
        },
        {
          montoMenor: 3_000_000,
          conceptoContiene: ['filtro'],
          categoriaId: 'insumos',
        },
        {
          montoMenor: 1_250_000,
          conceptoContiene: ['bujias'],
          categoriaId: 'insumos',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'cantidad-por-unitario',
    texto: '3 rollos de alambre de púa a 29.000 c/u',
    nota: 'Con "c/u" el monto se multiplica por la cantidad.',
    esperado: {
      items: [
        {
          montoMenor: 8_700_000,
          conceptoContiene: ['alambre', 'pua'],
          categoriaId: 'insumos-plantacion',
          cantidad: 3,
          unidad: 'rollos',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'cantidad-total',
    texto: '2 bultos de urea 120.000',
    nota: 'Sin "c/u", el monto es el total, no el precio unitario.',
    esperado: {
      items: [
        {
          montoMenor: 12_000_000,
          conceptoContiene: ['urea'],
          categoriaId: 'insumos-plantacion',
          cantidad: 2,
          unidad: 'bultos',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'separador-miles',
    texto: '1.500 de alambre',
    nota: 'En Colombia 1.500 son mil quinientos pesos.',
    esperado: {
      items: [
        {
          montoMenor: 150_000,
          conceptoContiene: ['alambre'],
          categoriaId: 'insumos-plantacion',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'decimales',
    texto: '45.000,50 de aceite',
    esperado: {
      items: [
        {
          montoMenor: 4_500_050,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'moneda-simbolo',
    texto: '$45.000 de filtro',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['filtro'],
          categoriaId: 'insumos',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'monto-primero',
    texto: '45.000 aceite tractor',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
          equipo: 'tractor',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'fecha-no-es-monto',
    texto: 'el 12 de marzo compré alambre 87.500',
    nota: 'El 12 es una fecha, no un monto.',
    esperado: {
      items: [
        {
          montoMenor: 8_750_000,
          conceptoContiene: ['alambre'],
          categoriaId: 'insumos-plantacion',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'otros-arroz',
    texto: '2 kilos de arroz por 5 mil pesos',
    nota: 'No encaja en ninguna categoría: va a Otros con etiqueta "arroz".',
    esperado: {
      items: [
        {
          montoMenor: 500_000,
          conceptoContiene: ['arroz'],
          categoriaId: 'otros',
          etiquetaContiene: ['arroz'],
          cantidad: 2,
          unidad: 'kilos',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'otros-mercado',
    texto: 'mercado 80.000',
    esperado: {
      items: [
        {
          montoMenor: 8_000_000,
          conceptoContiene: ['mercado'],
          categoriaId: 'otros',
          etiquetaContiene: ['mercado'],
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'otros-cemento',
    texto: '3 bultos de cemento 90.000',
    esperado: {
      items: [
        {
          montoMenor: 9_000_000,
          conceptoContiene: ['cemento'],
          categoriaId: 'otros',
          etiquetaContiene: ['cemento'],
          cantidad: 3,
          unidad: 'bultos',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'typos',
    texto: 'aceite 20w50 p tractor 45.000',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
          equipo: 'tractor',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'abreviatura-reparacion',
    texto: 'rep. bomba agua 120.000',
    esperado: {
      items: [
        {
          montoMenor: 12_000_000,
          conceptoContiene: ['bomba', 'agua'],
          categoriaId: 'reparacion-maquinaria',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'voz-numero-palabras',
    texto: 'eh... compré aceite para el tractor, cuarenta y cinco mil',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
          equipo: 'tractor',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'sin-monto-conocido',
    texto: 'filtro de aceite',
    esperado: {
      items: [
        {
          montoMenor: null,
          conceptoContiene: ['filtro', 'aceite'],
          categoriaId: 'insumos',
        },
      ],
      requiereRevision: true,
    },
  },
  {
    id: 'multi-uno-sin-monto',
    texto: 'aceite 45.000 y filtro',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
        },
        {
          montoMenor: null,
          conceptoContiene: ['filtro'],
        },
      ],
      requiereRevision: true,
    },
  },
  {
    id: 'moneda-palabra',
    texto: '45.000 pesos de alambre',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['alambre'],
          categoriaId: 'insumos-plantacion',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'mil-solo',
    texto: 'abono mil',
    esperado: {
      items: [
        {
          montoMenor: 100_000,
          conceptoContiene: ['abono'],
          categoriaId: 'insumos-plantacion',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'reparacion-motosierra',
    texto: 'reparación de la motosierra 60.000',
    esperado: {
      items: [
        {
          montoMenor: 6_000_000,
          conceptoContiene: ['reparacion', 'motosierra'],
          categoriaId: 'reparacion-maquinaria',
          equipo: 'motosierra',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'soldadura-tractor',
    texto: 'soldadura tractor 25.000',
    esperado: {
      items: [
        {
          montoMenor: 2_500_000,
          conceptoContiene: ['soldadura'],
          categoriaId: 'reparacion-maquinaria',
          equipo: 'tractor',
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'otros-veneno',
    texto: 'veneno para ratas 15.000',
    esperado: {
      items: [
        {
          montoMenor: 1_500_000,
          conceptoContiene: ['veneno', 'ratas'],
          categoriaId: 'otros',
          etiquetaContiene: ['veneno', 'ratas'],
        },
      ],
      requiereRevision: false,
    },
  },
  {
    id: 'sin-separador-dos-gastos',
    texto: 'aceite 45.000 filtro 30.000',
    nota: 'Dos gastos sin separador: si los separa, debe marcar la duda.',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
        },
        {
          montoMenor: 3_000_000,
          conceptoContiene: ['filtro'],
          categoriaId: 'insumos',
        },
      ],
      requiereRevision: true,
    },
  },
  {
    id: 'objeto-primero',
    texto: 'tractor aceite 45.000',
    nota: 'Formato original: objeto, qué se compró, costo.',
    esperado: {
      items: [
        {
          montoMenor: 4_500_000,
          conceptoContiene: ['aceite'],
          categoriaId: 'insumos',
          equipo: 'tractor',
        },
      ],
      requiereRevision: false,
    },
  },
];
