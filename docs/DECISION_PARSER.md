# Decisión del parser — cierre de F1

> Fecha: 2026-11-20
> Estado: **F1 cerrada**. La decisión rige F3.

---

## 1. La pregunta

¿Se puede convertir un mensaje escrito como en WhatsApp en gastos confiables, sin formularios y sin internet?

## 2. Método

- **120 casos de desarrollo**, usados para escribir las reglas.
- **50 casos de reserva**, con vocabulario distinto, medidos por primera vez al cierre.
- **27 casos adversarios**, escritos a mano antes del motor y medidos por primera vez al cierre.
- Se midió estructura (ítems, monto, concepto, cantidad, unidad, equipo, revisión), categoría y montos por separado.

Los umbrales de aceptación eran: montos ≥ 85%, segmentación ≥ 80%, concepto ≥ 75%, categorías ≥ 70%, cero montos errados sin marcar.

## 3. Resultados

| Corpus | Casos | Estructura | Categorías (ítems) | Montos |
|---|---|---|---|---|
| Desarrollo | 120 | 120/120 (100%) | 150/150 (100%) | 120/120 (100%) |
| Reserva | 50 | 50/50 (100%) | 62/62 (100%) | 50/50 (100%) |
| Adversarios | 27 | 24/27 (88.9%) | 27/29 (93.1%) | 27/27 (100%) |
| **Total** | **197** | **194/197 (98.5%)** | **239/241 (99.2%)** | **197/197 (100%)** |

El 100% de desarrollo es un piso esperable: comparte plantillas con las reglas. El dato que importa es la **reserva con vocabulario nuevo: 100%**. Eso indica que el motor generaliza la estructura, no solo las palabras.

**Ningún monto salió mal.** Los 197 casos acertaron los montos, incluidos los escritos en palabras y los precios unitarios.

## 4. Los tres fallos

| Caso | Qué pasó | Causa |
|---|---|---|
| `repuestos para la motosierra medio millón` | Categoría `otros` en vez de reparación de maquinaria | Falta el sinónimo “repuestos” |
| `rep. bomba agua 120.000` | Categoría `otros` en vez de reparación de maquinaria | Falta expandir la abreviatura “rep.” |
| `aceite 45.000 y filtro` | 1 ítem en vez de 2; no marcó revisión | Un fragmento sin monto después de un separador se fusionó con el anterior |

Ninguno es un problema de arquitectura: dos son vocabulario y uno es un caso límite de segmentación.

**No se corrigieron en F1 a propósito**, para no contaminar la línea base. Se resuelven en F3, donde el vocabulario pasa a ser configurable por el usuario y aprendido de las correcciones.

## 5. Decisión

**Se adopta el parser por reglas, local, sin servicios externos.**

Razones:

1. Acierta el 100% de los montos, que es lo que no se puede permitir fallar.
2. Generaliza a vocabulario nuevo sin reentrenar.
3. Funciona sin internet, en el teléfono y sin costo por mensaje.
4. Es determinista: el mismo mensaje produce siempre el mismo resultado.
5. Es explicable: cuando duda, se puede mostrar exactamente qué regla falló.

**No se usa un modelo de lenguaje en la v1.** Queda como plan B si en el piloto real la precisión cae por debajo de los umbrales, y en ese caso solo como ayuda al sincronizar, nunca como requisito para capturar.

## 6. Qué hereda F3

- **Sinónimos y abreviaturas**: “rep.” → “reparación”, “repuestos” → reparación de maquinaria. Se cargan como reglas y se amplían con cada corrección del usuario.
- **Cláusula sin monto**: `aceite 45.000 y filtro` debe producir dos ítems; el segundo queda pendiente con monto nulo.
- **Categorías desde la base**: el clasificador del spike usa cinco fijas; en F3 las categorías las define el usuario y las reglas apuntan a sus ids.
- **Confianza**: los valores por campo alimentan la pantalla de revisión de F4.
- **Regla de Otros + etiqueta**: confirmada; se mantiene.
- **Corpus**: queda como suite de regresión permanente. Los mensajes reales que aparezcan en el piloto se agregan anonimizados.

## 7. Umbrales de regresión

Quedan escritos en `evaluacion-final.test.ts`:

| Métrica | Umbral |
|---|---|
| Reserva: estructura | ≥ 95% |
| Reserva: categorías | ≥ 95% |
| Reserva: montos | ≥ 95% |
| Adversarios: estructura | ≥ 85% |
| Adversarios: categorías | ≥ 90% |
| Adversarios: montos | ≥ 90% |

Si un cambio futuro baja cualquiera de estos números, el CI falla.

## 8. Riesgos

- **El corpus es sintético.** El vocabulario real será más amplio y desordenado. Mitigación: reglas aprendidas, revisión asistida y medición durante el piloto.
- **El 100% de desarrollo puede engañar.** Por eso la decisión se apoya en la reserva y los adversarios, no en el desarrollo.
- **Las reglas pueden crecer sin control.** Cada sinónimo nuevo debe venir con su caso de prueba.
