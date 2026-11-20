// Generado por scripts/generar-corpus.mjs. No editar a mano.
// Regenerar con: npm run corpus:generar

import type { CasoParser } from './corpus-types';

export const CASOS_DESARROLLO: CasoParser[] = [
  {
    "id": "dev-001",
    "texto": "reparación de motosierra $45.000 y herbicida 45000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "reparacion",
            "motosierra"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-002",
    "texto": "manguera 75.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "manguera"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-003",
    "texto": "eh... compré aceite para el tractor, dos mil quinientos",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 250000,
          "conceptoContiene": [
            "aceite"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-004",
    "texto": "80 mil grasa",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "grasa"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-005",
    "texto": "tractor soldadura 60.000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-006",
    "texto": "eh... compré tornillos, ochenta mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "tornillos"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-007",
    "texto": "soldadura 80.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-008",
    "texto": "bujías para la motosierra 35,000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos",
          "equipo": "motosierra"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-009",
    "texto": "bujías $12.000, filtro de aceite 30000 y veneno para ratas $12.000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "filtro",
            "aceite"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "veneno",
            "ratas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "veneno",
            "ratas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-010",
    "texto": "5 unidades de cuadernos a $120.000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 60000000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ],
          "cantidad": 5,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-011",
    "texto": "2 bultos de cemento 80000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "cemento"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cemento"
          ],
          "cantidad": 2,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-012",
    "texto": "cemento 35000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "cemento"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cemento"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-013",
    "texto": "cambio de manguera 45.000 pesos y ajuste de motor 120.000 pesos",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-014",
    "texto": "2 litros de herbicida 120.000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 2,
          "unidad": "litros"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-015",
    "texto": "filtro de aceite $25.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "filtro",
            "aceite"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-016",
    "texto": "bomba de agua cambio de manguera 45 mil",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-017",
    "texto": "4 bultos de cal $60.000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "cal"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 4,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-018",
    "texto": "cal",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "cal"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-019",
    "texto": "ajuste de motor 90.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-020",
    "texto": "el 28 de noviembre compré correa $80.000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "correa"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-021",
    "texto": "cuadernos $35.000 y cal 45000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ]
        },
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "cal"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-022",
    "texto": "el 5 de septiembre compré pilas 3,000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 300000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-023",
    "texto": "$250.000 urea",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 25000000,
          "conceptoContiene": [
            "urea"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-024",
    "texto": "bomba de agua manguera 80.000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "manguera"
          ],
          "categoriaId": "insumos",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-025",
    "texto": "$80.000 semilla de maíz",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "semilla",
            "maiz"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-026",
    "texto": "manguera para la bomba de agua 90.000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "manguera"
          ],
          "categoriaId": "insumos",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-027",
    "texto": "filtro de aceite 8,000 alambre de púa 120000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 800000,
          "conceptoContiene": [
            "filtro",
            "aceite"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "alambre",
            "pua"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-028",
    "texto": "el 14 de enero compré grasa 80000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "grasa"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-029",
    "texto": "soldadura para el tractor $80.000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-030",
    "texto": "eh... compré tornillos, doscientos cincuenta mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 25000000,
          "conceptoContiene": [
            "tornillos"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-031",
    "texto": "soldadura 120.000 pesos",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-032",
    "texto": "reparación de motosierra $150.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 15000000,
          "conceptoContiene": [
            "reparacion",
            "motosierra"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-033",
    "texto": "bujías $75.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-034",
    "texto": "tractor filtro de aceite 120,000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "filtro",
            "aceite"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-035",
    "texto": "pilas 12 mil y correa 12000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        },
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "correa"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-036",
    "texto": "eh... compré cemento, ochenta mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "cemento"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cemento"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-037",
    "texto": "4 kilos de arroz 75,000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "arroz"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "arroz"
          ],
          "cantidad": 4,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-038",
    "texto": "el 7 de noviembre compré herbicida 45.000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-039",
    "texto": "5 bultos de abono a $60.000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 30000000,
          "conceptoContiene": [
            "abono"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 5,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-040",
    "texto": "3 bultos de abono 30,000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "abono"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 3,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-041",
    "texto": "filtro de aceite 30.000 pesos grasa 35.000 pesos",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "filtro",
            "aceite"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "grasa"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-042",
    "texto": "cal $30.000, mercado $45.000 y correa 18,000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "cal"
          ],
          "categoriaId": "insumos-plantacion"
        },
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "mercado"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "mercado"
          ]
        },
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "correa"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-043",
    "texto": "ajuste de motor 250.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 25000000,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-044",
    "texto": "4 rollos de alambre de púa a 150000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 60000000,
          "conceptoContiene": [
            "alambre",
            "pua"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 4,
          "unidad": "rollos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-045",
    "texto": "manguera $90.000, tornillos 25.000 y bujías 120 mil",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "manguera"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "tornillos"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-046",
    "texto": "12000 pilas",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-047",
    "texto": "35.000 urea",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "urea"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-048",
    "texto": "cambio de manguera 60 mil urea 150,000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 15000000,
          "conceptoContiene": [
            "urea"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-049",
    "texto": "semilla de maíz",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "semilla",
            "maiz"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-050",
    "texto": "arroz $45.000, pilas 8 mil y reparación de motosierra 30.000 pesos",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "arroz"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "arroz"
          ]
        },
        {
          "montoMenor": 800000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        },
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "reparacion",
            "motosierra"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-051",
    "texto": "cambio de manguera 25 mil tornillos 120.000 pesos",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "tornillos"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-052",
    "texto": "tractor grasa 18 mil",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "grasa"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-053",
    "texto": "reparación de bomba",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "reparacion",
            "bomba"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-054",
    "texto": "tornillos",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "tornillos"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-055",
    "texto": "aceite 18,000 y manguera 15.000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "aceite"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "manguera"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-056",
    "texto": "bujías para la motosierra 120000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos",
          "equipo": "motosierra"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-057",
    "texto": "90.000 bujías",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-058",
    "texto": "cuadernos 12.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-059",
    "texto": "$8.000 mercado",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 800000,
          "conceptoContiene": [
            "mercado"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "mercado"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-060",
    "texto": "el 18 de marzo compré cemento 60.000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "cemento"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cemento"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-061",
    "texto": "correa 15,000 reparación de bomba 25.000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "correa"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "reparacion",
            "bomba"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-062",
    "texto": "$35.000 herbicida",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-063",
    "texto": "2 bultos de abono a 12.000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 2400000,
          "conceptoContiene": [
            "abono"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 2,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-064",
    "texto": "90000 abono",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "abono"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-065",
    "texto": "bomba de agua cambio de manguera 120000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-066",
    "texto": "ajuste de motor para la guadañadora 250.000 pesos",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 25000000,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "guadañadora"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-067",
    "texto": "ajuste de motor 120000 pilas $18.000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-068",
    "texto": "tornillos 120.000 pesos, veneno para ratas $18.000 y grasa $15.000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "tornillos"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "veneno",
            "ratas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "veneno",
            "ratas"
          ]
        },
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "grasa"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-069",
    "texto": "3 rollos de alambre de púa a 80 mil c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 24000000,
          "conceptoContiene": [
            "alambre",
            "pua"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 3,
          "unidad": "rollos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-070",
    "texto": "pilas 90.000 pesos",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-071",
    "texto": "5 bultos de urea a 250 mil c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 125000000,
          "conceptoContiene": [
            "urea"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 5,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-072",
    "texto": "el 3 de noviembre compré veneno para ratas 35.000 pesos",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "veneno",
            "ratas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "veneno",
            "ratas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-073",
    "texto": "urea $15.000 y ajuste de motor 120000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "urea"
          ],
          "categoriaId": "insumos-plantacion"
        },
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-074",
    "texto": "manguera para la bomba de agua 120 mil",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "manguera"
          ],
          "categoriaId": "insumos",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-075",
    "texto": "tractor aceite 8.000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 800000,
          "conceptoContiene": [
            "aceite"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-076",
    "texto": "2 unidades de cuadernos a $8.000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 1600000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ],
          "cantidad": 2,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-077",
    "texto": "eh... compré reparación de bomba para la bomba de agua, treinta mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "reparacion",
            "bomba"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-078",
    "texto": "soldadura para el tractor 250.000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 25000000,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-079",
    "texto": "soldadura para el tractor 80000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-080",
    "texto": "bujías para la motosierra $30.000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos",
          "equipo": "motosierra"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-081",
    "texto": "pilas 30.000 y semilla de maíz 80,000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        },
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "semilla",
            "maiz"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-082",
    "texto": "4 unidades de cuadernos a 30 mil c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ],
          "cantidad": 4,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-083",
    "texto": "3 bultos de cemento $30.000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "cemento"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cemento"
          ],
          "cantidad": 3,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-084",
    "texto": "cemento 5.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 500000,
          "conceptoContiene": [
            "cemento"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cemento"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-085",
    "texto": "3 kilos de arroz 35,000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "arroz"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "arroz"
          ],
          "cantidad": 3,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-086",
    "texto": "eh... compré herbicida, ciento veinte mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-087",
    "texto": "aceite 120000 y cuadernos 8 mil",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "aceite"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 800000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-088",
    "texto": "abono 18000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "abono"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-089",
    "texto": "cambio de manguera 150.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 15000000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-090",
    "texto": "ajuste de motor para la guadañadora",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "guadañadora"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-091",
    "texto": "3 rollos de alambre de púa 120.000 pesos",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "alambre",
            "pua"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 3,
          "unidad": "rollos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-092",
    "texto": "4 rollos de alambre de púa 120.000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 12000000,
          "conceptoContiene": [
            "alambre",
            "pua"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 4,
          "unidad": "rollos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-093",
    "texto": "3 unidades de pilas 25.000 pesos",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ],
          "cantidad": 3,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-094",
    "texto": "el 22 de abril compré urea 35000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "urea"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-095",
    "texto": "veneno para ratas",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "veneno",
            "ratas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "veneno",
            "ratas"
          ]
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-096",
    "texto": "reparación de bomba 25,000, mercado 60.000 y herbicida 15.000 pesos",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "reparacion",
            "bomba"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "mercado"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "mercado"
          ]
        },
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-097",
    "texto": "manguera para la bomba de agua",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "manguera"
          ],
          "categoriaId": "insumos",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-098",
    "texto": "tractor aceite $80.000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "aceite"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-099",
    "texto": "aceite 15.000 cambio de manguera 150.000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "aceite"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 15000000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-100",
    "texto": "5 unidades de cuadernos a 25.000 pesos c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 12500000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ],
          "cantidad": 5,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-101",
    "texto": "pilas 35000 y soldadura 35.000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "pilas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "pilas"
          ]
        },
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-102",
    "texto": "soldadura para el tractor",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "soldadura"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-103",
    "texto": "25 mil reparación de motosierra",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "reparacion",
            "motosierra"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-104",
    "texto": "eh... compré bujías para la motosierra, ochenta mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "bujias"
          ],
          "categoriaId": "insumos",
          "equipo": "motosierra"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-105",
    "texto": "3 unidades de cuadernos a $12.000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 3600000,
          "conceptoContiene": [
            "cuadernos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuadernos"
          ],
          "cantidad": 3,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-106",
    "texto": "filtro de aceite para el tractor $35.000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "filtro",
            "aceite"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-107",
    "texto": "cemento 15,000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "cemento"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cemento"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-108",
    "texto": "5 kilos de arroz 45.000 pesos",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "arroz"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "arroz"
          ],
          "cantidad": 5,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-109",
    "texto": "5 litros de herbicida a 90,000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 45000000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 5,
          "unidad": "litros"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-110",
    "texto": "eh... compré filtro de aceite para el tractor, veinticinco mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "filtro",
            "aceite"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-111",
    "texto": "4 bultos de abono 18000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "abono"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 4,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-112",
    "texto": "bomba de agua cambio de manguera 75,000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "cambio",
            "manguera"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "bomba de agua"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-113",
    "texto": "cal 90.000 pesos",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "cal"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-114",
    "texto": "guadañadora ajuste de motor 60000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "ajuste",
            "motor"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "guadañadora"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-115",
    "texto": "aceite 18.000 pesos reparación de motosierra 30 mil",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "aceite"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "reparacion",
            "motosierra"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "dev-116",
    "texto": "5 rollos de alambre de púa 150000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 15000000,
          "conceptoContiene": [
            "alambre",
            "pua"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 5,
          "unidad": "rollos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-117",
    "texto": "reparación de bomba 500 mil y herbicida 75 mil",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 50000000,
          "conceptoContiene": [
            "reparacion",
            "bomba"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "herbicida"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-118",
    "texto": "2 bultos de urea 18.000 pesos",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "urea"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 2,
          "unidad": "bultos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-119",
    "texto": "el 27 de octubre compré veneno para ratas $5.000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 500000,
          "conceptoContiene": [
            "veneno",
            "ratas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "veneno",
            "ratas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "dev-120",
    "texto": "2 kilos de semilla de maíz a 120000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 24000000,
          "conceptoContiene": [
            "semilla",
            "maiz"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 2,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  }
];
