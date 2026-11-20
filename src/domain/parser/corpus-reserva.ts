// Generado por scripts/generar-corpus.mjs. No editar a mano.
// Regenerar con: npm run corpus:generar

import type { CasoParser } from './corpus-types';

export const CASOS_RESERVA: CasoParser[] = [
  {
    "id": "res-001",
    "texto": "80.000 llave de tuercas",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "llave",
            "tuercas"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-002",
    "texto": "eh... compré semilla de pasto, dos mil quinientos",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 250000,
          "conceptoContiene": [
            "semilla",
            "pasto"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-003",
    "texto": "postes $35.000, reparación de guadañadora 60.000 y papas 3.000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "postes"
          ],
          "categoriaId": "insumos-plantacion"
        },
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "reparacion",
            "guadanadora"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 300000,
          "conceptoContiene": [
            "papas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "papas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-004",
    "texto": "gasolina 18,000 papas 3.000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "gasolina"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "gasolina"
          ]
        },
        {
          "montoMenor": 300000,
          "conceptoContiene": [
            "papas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "papas"
          ]
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "res-005",
    "texto": "aceite hidráulico para el tractor $15.000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "aceite",
            "hidraulico"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-006",
    "texto": "filtro de combustible para el tractor 30.000 pesos",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "filtro",
            "combustible"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-007",
    "texto": "4 bultos de fertilizante 80 mil",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "fertilizante"
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
    "id": "res-008",
    "texto": "fertilizante 80.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "fertilizante"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-009",
    "texto": "3 unidades de panela a 30000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "panela"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "panela"
          ],
          "cantidad": 3,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-010",
    "texto": "bombillos",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "bombillos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "bombillos"
          ]
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "res-011",
    "texto": "reparación de guadañadora",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "reparacion",
            "guadanadora"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "res-012",
    "texto": "3 galones de gasolina 12.000 pesos",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "gasolina"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "gasolina"
          ],
          "cantidad": 3,
          "unidad": "galones"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-013",
    "texto": "tractor filtro de combustible 75.000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "filtro",
            "combustible"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-014",
    "texto": "3 bultos de gallinaza 12000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "gallinaza"
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
    "id": "res-015",
    "texto": "fertilizante 250000 y papas 15.000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 25000000,
          "conceptoContiene": [
            "fertilizante"
          ],
          "categoriaId": "insumos-plantacion"
        },
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "papas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "papas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-016",
    "texto": "cambio de correa para el tractor 30.000 pesos",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "cambio",
            "correa"
          ],
          "categoriaId": "reparacion-maquinaria",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-017",
    "texto": "5 kilos de semilla de pasto a 60.000 pesos c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 30000000,
          "conceptoContiene": [
            "semilla",
            "pasto"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 5,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-018",
    "texto": "5 kilos de papas $45.000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "papas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "papas"
          ],
          "cantidad": 5,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-019",
    "texto": "cambio de correa 60.000 pesos",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "cambio",
            "correa"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-020",
    "texto": "cuerda 3.000 bombillos 18000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 300000,
          "conceptoContiene": [
            "cuerda"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuerda"
          ]
        },
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "bombillos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "bombillos"
          ]
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "res-021",
    "texto": "eh... compré cuerda, dos mil quinientos",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 250000,
          "conceptoContiene": [
            "cuerda"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuerda"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-022",
    "texto": "filtro de combustible para el tractor 15000",
    "plantilla": "paraEquipo",
    "esperado": {
      "items": [
        {
          "montoMenor": 1500000,
          "conceptoContiene": [
            "filtro",
            "combustible"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-023",
    "texto": "$30.000 fertilizante",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "fertilizante"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-024",
    "texto": "3,000 panela",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 300000,
          "conceptoContiene": [
            "panela"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "panela"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-025",
    "texto": "tractor filtro de combustible 30 mil",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "filtro",
            "combustible"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-026",
    "texto": "gasolina",
    "plantilla": "sinMonto",
    "esperado": {
      "items": [
        {
          "montoMenor": null,
          "conceptoContiene": [
            "gasolina"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "gasolina"
          ]
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "res-027",
    "texto": "4 bultos de gallinaza a 90.000 c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 36000000,
          "conceptoContiene": [
            "gallinaza"
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
    "id": "res-028",
    "texto": "gallinaza 25.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "gallinaza"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-029",
    "texto": "postes 12,000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "postes"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-030",
    "texto": "2 kilos de semilla de pasto a 120 mil c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 24000000,
          "conceptoContiene": [
            "semilla",
            "pasto"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 2,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-031",
    "texto": "2 kilos de semilla de pasto 45,000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "semilla",
            "pasto"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 2,
          "unidad": "kilos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-032",
    "texto": "cuerda 60.000, reparación de guadañadora 75.000 y llave de tuercas 60 mil",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "cuerda"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuerda"
          ]
        },
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "reparacion",
            "guadanadora"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "llave",
            "tuercas"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-033",
    "texto": "el 6 de noviembre compré cambio de correa $80.000",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "cambio",
            "correa"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-034",
    "texto": "tractor aceite hidráulico 80,000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "aceite",
            "hidraulico"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-035",
    "texto": "cuerda 18,000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "cuerda"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuerda"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-036",
    "texto": "tractor filtro de combustible 25.000",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "filtro",
            "combustible"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-037",
    "texto": "gallinaza $45.000 y panela 30 mil",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 4500000,
          "conceptoContiene": [
            "gallinaza"
          ],
          "categoriaId": "insumos-plantacion"
        },
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "panela"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "panela"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-038",
    "texto": "tractor filtro de combustible 80.000 pesos",
    "plantilla": "equipoPrimero",
    "esperado": {
      "items": [
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "filtro",
            "combustible"
          ],
          "categoriaId": "insumos",
          "equipo": "tractor"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-039",
    "texto": "cinta aislante 35.000, semilla de pasto 80.000 y bombillos 8.000 pesos",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "cinta",
            "aislante"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "semilla",
            "pasto"
          ],
          "categoriaId": "insumos-plantacion"
        },
        {
          "montoMenor": 800000,
          "conceptoContiene": [
            "bombillos"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "bombillos"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-040",
    "texto": "reparación de guadañadora 60.000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 6000000,
          "conceptoContiene": [
            "reparacion",
            "guadanadora"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-041",
    "texto": "reparación de guadañadora 25.000 pesos y fertilizante 18.000",
    "plantilla": "multi",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "reparacion",
            "guadanadora"
          ],
          "categoriaId": "reparacion-maquinaria"
        },
        {
          "montoMenor": 1800000,
          "conceptoContiene": [
            "fertilizante"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-042",
    "texto": "2 bultos de gallinaza a 12.000 pesos c/u",
    "plantilla": "cantidadUnitario",
    "esperado": {
      "items": [
        {
          "montoMenor": 2400000,
          "conceptoContiene": [
            "gallinaza"
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
    "id": "res-043",
    "texto": "el 8 de noviembre compré gallinaza 250.000 pesos",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 25000000,
          "conceptoContiene": [
            "gallinaza"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-044",
    "texto": "2 unidades de postes 90000",
    "plantilla": "cantidadTotal",
    "esperado": {
      "items": [
        {
          "montoMenor": 9000000,
          "conceptoContiene": [
            "postes"
          ],
          "categoriaId": "insumos-plantacion",
          "cantidad": 2,
          "unidad": "unidades"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-045",
    "texto": "llave de tuercas 75.000 pesos",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 7500000,
          "conceptoContiene": [
            "llave",
            "tuercas"
          ],
          "categoriaId": "insumos"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-046",
    "texto": "el 27 de mayo compré semilla de pasto 12.000 pesos",
    "plantilla": "fecha",
    "esperado": {
      "items": [
        {
          "montoMenor": 1200000,
          "conceptoContiene": [
            "semilla",
            "pasto"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-047",
    "texto": "eh... compré papas, veinticinco mil",
    "plantilla": "voz",
    "esperado": {
      "items": [
        {
          "montoMenor": 2500000,
          "conceptoContiene": [
            "papas"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "papas"
          ]
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-048",
    "texto": "cambio de correa 500,000",
    "plantilla": "final",
    "esperado": {
      "items": [
        {
          "montoMenor": 50000000,
          "conceptoContiene": [
            "cambio",
            "correa"
          ],
          "categoriaId": "reparacion-maquinaria"
        }
      ],
      "requiereRevision": false
    }
  },
  {
    "id": "res-049",
    "texto": "cinta aislante 35 mil semilla de pasto 80.000",
    "plantilla": "multiSinSeparador",
    "esperado": {
      "items": [
        {
          "montoMenor": 3500000,
          "conceptoContiene": [
            "cinta",
            "aislante"
          ],
          "categoriaId": "insumos"
        },
        {
          "montoMenor": 8000000,
          "conceptoContiene": [
            "semilla",
            "pasto"
          ],
          "categoriaId": "insumos-plantacion"
        }
      ],
      "requiereRevision": true
    }
  },
  {
    "id": "res-050",
    "texto": "$30.000 cuerda",
    "plantilla": "inicio",
    "esperado": {
      "items": [
        {
          "montoMenor": 3000000,
          "conceptoContiene": [
            "cuerda"
          ],
          "categoriaId": "otros",
          "etiquetaContiene": [
            "cuerda"
          ]
        }
      ],
      "requiereRevision": false
    }
  }
];
