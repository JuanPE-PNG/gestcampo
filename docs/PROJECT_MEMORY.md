# Memoria del proyecto — GestCampo

> **Última actualización:** 2026-11-20
> **Fase actual:** F1 completada — próxima: F2 (captura offline)
> **Versión de la app:** 0.1.0

---

## 0. Instrucciones para quien retome el proyecto

Este archivo es la fuente de contexto entre sesiones. Si estás leyendo esto en un chat nuevo:

1. **Leelo completo antes de escribir código.**
2. Leé también `docs/WORKFLOW.md`: el flujo de trabajo y las pruebas son obligatorios. Si el trabajo toca F6, leé `docs/CUENTAS_Y_BACKUPS.md`; si toca el parser, `docs/DECISION_PARSER.md`.
3. Verificá el estado real con `git log --oneline -10` y `npm run verify`.
4. **No implementes nada fuera del alcance congelado (§3)** sin que el dueño lo pida.
5. Al terminar la sesión: actualizá §7 (roadmap), §8 (estado), §9 (deudas) y §11 (bitácora), y hacé commit.

**Idioma:** documentación y nombres de dominio en español. Las APIs de librerías, en inglés.

---

## 1. Qué es el proyecto

Aplicación **Android** para una persona que trabaja en el campo y registra los gastos del día escribiendo en un chat propio, de la misma manera en que hoy usa WhatsApp.

Durante el día no tiene internet. Anota en el teléfono; cada anotación se guarda al instante. De noche, al llegar a la casa, sincroniza desde el mismo teléfono, revisa lo del día, corrige lo que haga falta y genera los informes.

**El objetivo es eliminar el trabajo manual de la noche:** hoy pasa todo a mano a Excel, cambia entre hojas y hace los cálculos. La app reemplaza ese traspaso.

**No usa computadora en ningún punto del flujo.** Todo termina en el teléfono.

El producto se vende por **suscripción anual** a varios clientes. Cada cliente tiene su cuenta, creada por el administrador y asociada a un correo; la información queda aislada y cifrada por cuenta.

---

## 2. Restricciones del producto (no negociables)

- **Android únicamente.** Desarrollo con Expo.
- **Offline primero:** capturar e informar sin red. La red solo se necesita para sincronizar.
- **Una cuenta por cliente, un usuario por cuenta.** El sistema es multi-cliente: cada cliente ve solo sus datos. No hay varios usuarios dentro de una misma cuenta, ni roles, ni permisos.
- **Suscripción anual** con fecha de vencimiento. Al vencer, **bloqueo total** de la app; el login sigue disponible para renovar y los datos no se borran.
- **Cuentas creadas por el administrador**, asociadas a un correo, con autenticación obligatoria y datos cifrados por cuenta.
- **Backups en el servidor**, con retención escalonada: 7 diarios + 4 semanales + 12 mensuales + 3 manuales.
- **Un dispositivo por cuenta** (pendiente decidir si el segundo se bloquea o se transfiere).
- **Una sola caja.** No se registra de dónde salió el dinero; solo importa el monto.
- **Una sola moneda.**
- **Un solo centro de costo:** la finca.
- **No se cierran días.** Cualquier fecha pasada es editable en cualquier momento, para siempre. Un gasto avisado al día siguiente se agrega al día que corresponde.
- **Categorías creadas por el usuario.** Sin límite. “Otros” existe siempre y no se puede borrar.
- **Todo se puede exportar:** PDF para entregar y Excel para trabajar los números.
- **Nada se borra:** se corrige, se anula o se versiona.

---

## 3. Alcance congelado

**Entra:**

- Chat de captura offline, texto y voz.
- Parser de texto libre a gastos; un mensaje puede generar varios gastos.
- Vista por día con edición libre, sin cierres.
- Categorías dinámicas con “Otros” obligatoria.
- Informes diario, semanal, mensual, anual y por período libre, en PDF.
- **Exportación a Excel.**
- Cuentas, suscripción anual, sincronización con nube y backups rotativos en el servidor.

**No entra:**

- iOS.
- Multiusuario dentro de una misma cuenta (sí existe multi-cliente).
- Presupuestos o alertas.
- OCR de recibos.
- Bot de WhatsApp.
- Integraciones contables.
- Gráficos avanzados.

---

## 4. Decisiones técnicas congeladas

| Tema | Decisión |
|---|---|
| Nombre | **GestCampo** (tagline: “Tus cuentas del campo, al día”) |
| Identificadores | slug `gestcampo` · scheme `gestcampo` · package `com.gestcampo.app` |
| Framework | Expo SDK 58 + React Native + TypeScript |
| Navegación | `expo-router` (4 pestañas) |
| Base local | SQLite (`expo-sqlite`), con migraciones versionadas |
| IDs | UUID v4 generados en el dispositivo |
| Dinero | Enteros en unidades menores (centavos). Nunca flotantes |
| Fechas de negocio | Día local `YYYY-MM-DD`; instantes en ISO 8601 UTC |
| Mensajes | Append-only: no se editan ni se borran |
| Borrado | Lógico: estado `anulado` |
| Categorías | Tabla dinámica, sin enums en el código |
| Informes | Un modelo de informe y dos exportadores: PDF y Excel |
| PDF | `expo-print` (HTML → PDF) |
| Excel | SheetJS (`xlsx`) en el dispositivo |
| Archivos | `expo-file-system` + `expo-sharing` |
| Backend | Supabase (Postgres + Auth + Storage) — aún no creado |
| Pruebas | `jest-expo` para dominio y datos |

**Regla de arquitectura:** la UI no calcula nada. Sumas, agrupaciones y formateos viven en el dominio.

---

## 5. Arquitectura

```
UI (expo-router)
 ├─ Chat        ├─ Días        ├─ Informes        └─ Ajustes
                        │
Dominio (sin UI, testeable)
 ├─ captura          mensajes append-only
 ├─ parser           texto/audio → gastos + confianza
 ├─ gastos           CRUD, historial, anulación
 ├─ categorías       dinámicas + "Otros"
 ├─ agregación       totales y agrupaciones
 └─ informe          modelo único del período
                        │
Infraestructura
 ├─ SQLite + migraciones
 ├─ exportadores: PDF | XLSX
 ├─ sync (outbox)
 ├─ voz (grabación + transcripción)
 └─ archivos + compartir
                        │
Supabase: auth · Postgres · storage
```

Estado actual: solo existe la capa de UI (esqueleto) y dos piezas de dominio (`types.ts`, `money.ts`).

---

## 6. Modelo de datos

| Entidad | Campos esenciales |
|---|---|
| **mensaje** | id, deviceId, creadoEn, tipo, texto, audioUri, estadoParseo |
| **gasto** | id, mensajeId, fecha, montoMenor, moneda, concepto, categoriaId, equipo, nota, estadoCiclo, estadoSync, version |
| **categoría** | id, nombre, orden, esRespaldo |
| **historial** | gastoId, campo, valorAnterior, valorNuevo, autor, motivo, fecha |
| **informe** | id, tipo, desde, hasta, filtros, generadoEn, datosHash, archivo |
| **outbox** | opId, entidad, entidadId, tipo, payload, estado, intentos, error |

Entidades del servidor (F6), no locales:

| Entidad | Campos esenciales |
|---|---|
| **cuenta** | id, email/teléfono, nombre, estado |
| **suscripción** | cuentaId, plan, inicio, vence, estado, referencia de pago |
| **backup** | id, cuentaId, creadoEn, motivo, ruta, bytes, hash |

Estados:

- **Ciclo:** `propuesto` → `revisado` · `anulado`.
- **Sincronización:** `local` → `en_cola` → `sincronizado` · `error`.

Los dos ejes son independientes. “Sincronizado” no significa “terminado”.

### Invariantes

1. No existe un gasto sin un mensaje de origen.
2. Ningún mensaje se modifica ni se elimina.
3. Ninguna edición destruye el valor anterior.
4. Escribir no depende de la red.
5. Generar un informe no depende de la red.
6. Sincronizar no altera contenido.
7. Un error de red deja el sistema consistente y reintentable.
8. Los montos son enteros en unidad mínima, con moneda explícita.
9. Cualquier día pasado se puede editar, sin excepciones.
10. Todos los datos son exportables completos sin la app.

### Regla de “Otros”

Un gasto que no encaja en ninguna categoría **no queda sin clasificar**: va a
`Otros` y se le asigna una **etiqueta** con el nombre exacto del gasto
(ejemplo: `2 kilos de arroz por 5 mil` → categoría `Otros`, etiqueta `arroz`).

- La etiqueta es texto libre, normalizado (minúsculas, sin tildes).
- Sirve para agrupar los gastos de “Otros” en los informes.
- Si una etiqueta se repite mucho, más adelante se podrá proponer crear una
  categoría propia (fuera del alcance de F1).
- `Otros` siempre existe y no se puede borrar.

---

## 7. Roadmap y estado

| Fase | Alcance | Estado |
|---|---|---|
| **F0** | Fundaciones: repo, Expo, estructura, tema, documentación, pruebas | Completada (queda build de desarrollo) |
| **F1** | Spike del parser con datos de prueba | **Completada** |
| F2 | Captura offline (chat + persistencia) | Próxima |
| F3 | Gastos estructurados (parser, edición, historial, anulación) | Pendiente |
| F4 | Días, categorías y flujo de revisión | Pendiente |
| F5 | Informes PDF + exportación Excel | Pendiente |
| F6.1 | Cuentas, autenticación, aislamiento por cuenta y sincronización | Pendiente |
| F6.2 | Suscripción, bloqueo al vencer, backups escalonados y restauración | Pendiente |
| F7 | Voz | Pendiente |
| F8 | Endurecimiento, rendimiento y piloto | Pendiente |

Hitos usables: **M1** al terminar F2 (bloc de notas), **M2** al terminar F4 (registro completo), **M3** al terminar F5 (MVP con informes).

### F0 en detalle

- [x] Repositorio git inicializado.
- [x] Proyecto Expo SDK 58 con TypeScript.
- [x] `expo-router` con 4 pestañas: Chat, Días, Informes, Ajustes.
- [x] Tokens visuales base (`src/theme/tokens.ts`).
- [x] Tipos del dominio (`src/domain/types.ts`).
- [x] Utilidad de dinero con pruebas (`src/domain/money.ts`).
- [x] Scripts `typecheck`, `lint`, `test`, `verify`.
- [x] ESLint configurado (`eslint.config.js`).
- [x] Bundle Android validado (`expo export`).
- [x] Documentación del proyecto (`docs/`).
- [x] `npm run verify` en verde (16 pruebas).
- [x] Probada en dispositivo Android real.
- [ ] Crear build de desarrollo (EAS o `expo run:android`).

### F1 en detalle

Sesiones definidas para el spike del parser:

- [x] **1.** Contrato (`src/domain/parser/types.ts`) y 27 casos adversarios.
- [x] **2.** Corpus de desarrollo (120) y de reserva (50), con pruebas de integridad.
- [x] **3.** Normalización y extracción de monto (100% en desarrollo).
- [x] **4.** Segmentación, concepto, cantidad/unidad y equipo (100% en desarrollo).
- [x] **5.** Categorías, confianza y banderas de revisión (100% en desarrollo).
- [x] **6.** Medición sobre reserva y adversarios, decisión y cierre.

Resultados del cierre (detalle en `docs/DECISION_PARSER.md`):

| Corpus | Estructura | Categorías | Montos |
|---|---|---|---|
| Desarrollo (120) | 100% | 100% | 100% |
| Reserva (50) | 100% | 100% | 100% |
| Adversarios (27) | 88.9% | 93.1% | 100% |
| **Total (197)** | **98.5%** | **99.2%** | **100%** |

Decisión: **parser por reglas, local, sin IA externa**. Los tres fallos adversarios (sinónimos, abreviatura “rep.” y cláusula sin monto) pasan a F3.
- [ ] **5.** Categorías, confianza y banderas de revisión.
- [ ] **6.** Reporte final y decisión (`docs/DECISION_PARSER.md`).

Archivos creados en F1:

```
src/domain/parser/types.ts              contrato del parser
src/domain/parser/categorias-prueba.ts   cinco categorías fijas del spike
src/domain/parser/corpus-types.ts       tipos del corpus
src/domain/parser/corpus-adversarios.ts 27 casos que rompen todo
src/domain/parser/corpus-desarrollo.ts  120 casos generados para ajustar reglas
src/domain/parser/corpus-reserva.ts     50 casos generados, no se tocan hasta el cierre
src/domain/parser/corpus.test.ts        pruebas de integridad del corpus
src/domain/parser/parser.ts             motor: segmentación y concepto
src/domain/parser/clasificar.ts         categorías por palabras clave + Otros/etiqueta
src/domain/parser/medir-estructura.ts   medición de la estructura completa
src/domain/parser/estructura-corpus.test.ts  umbral de calidad sobre desarrollo
scripts/generar-corpus.mjs              generador reproducible (semilla fija)
```

---

## 8. Estado actual del repositorio

**Funciona:**

- La app compila y navega entre las 4 pestañas.
- Cada pantalla muestra su fase y lo que va a incluir.
- `parsearMonto` / `formatearMonto` con pruebas unitarias.
- Contrato del parser, 27 casos adversarios y corpus generado (120 + 50).
- Pruebas de integridad del corpus (11 pruebas).
- Normalización, números en palabras y extracción de montos, con medición (100% en el corpus de desarrollo).
- Motor del parser: segmentación, concepto, cantidad/unidad, equipo y total por precio unitario (100% en desarrollo).
- Clasificación por categorías con regla de **Otros + etiqueta** y confianza por campo.
- Evaluación final de F1 con reserva y adversarios, y decisión documentada en `docs/DECISION_PARSER.md`.
- `npm run verify` ejecuta typecheck, lint y tests (90 pruebas).

**No existe todavía:**

- Base de datos local ni migraciones.
- Persistencia de mensajes.
- Categorías reales (las del spike son fijas).
- Informes, PDF y Excel.
- Sincronización, cuenta y respaldo.
- Voz.

**Comandos:**

```bash
npm install          # instalar dependencias
npm start            # servidor de desarrollo
npm run android      # abrir en Android
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm test             # pruebas
npm run verify       # las tres anteriores, en orden
```

---

## 9. Deudas y decisiones pendientes

- **Moneda:** se asumió `COP` en `src/config.ts`. Confirmar con el dueño.
- **Equipo:** se mantiene como texto libre (`Gasto.equipo`). Confirmar si alcanza o si hace falta catálogo.
- **Package Android:** `com.gestcampo.app` (definido). No se puede cambiar después de publicar en Play Store.
- **Backend:** Supabase no está creado. Hace falta cuenta, proyecto y claves (fase F6).
- **Suscripción:** política definida: **bloqueo total al vencer**. La pasarela de pago queda fuera de alcance por ahora; la activación es manual.
- **Backups:** definidos en `docs/CUENTAS_Y_BACKUPS.md`: en el servidor, 7 diarios + 4 semanales + 12 mensuales + 3 manuales.
- **Dispositivo:** falta decidir si el segundo teléfono se bloquea o se transfiere.
- **Cifrado:** en reposo por ahora; evaluar extremo a extremo más adelante.
- **Parser (F3):** agregar sinónimos (“repuestos”), abreviaturas (“rep.”) y el caso de cláusula sin monto después de un separador. Ver `docs/DECISION_PARSER.md` §6.
- **EAS:** no hay proyecto ni perfil de build configurado.
- **Voz:** falta elegir librería y confirmar que requiere development build.
- **Datos de prueba:** se van a generar sintéticos; no se usan datos reales.

---

## 10. Riesgos

| Riesgo | Mitigación |
|---|---|
| Parser con baja precisión | F1 antes de construir pantallas; set de prueba medible |
| SheetJS con problemas en RN | Probarlo temprano; plan B: generar Excel en el backend |
| Voz nativa en Expo | Development build desde F0 |
| Pérdida de datos antes de la nube | Exportación manual temporal + aviso en la app |
| Crecimiento del alcance | §3 de este documento es un contrato |

---

## 11. Bitácora

### 2026-11-20 — F1, sesión 6: evaluación final y cierre

- Reserva (50): estructura 100%, categorías 100%, montos 100%.
- Adversarios (27): estructura 88.9%, categorías 93.1%, montos 100%.
- Total (197): estructura 98.5%, categorías 99.2%, montos 100%.
- **Decisión: parser por reglas, local, sin IA externa.** Documento: `docs/DECISION_PARSER.md`.
- Tres fallos adversarios identificados y diferidos a F3: sinónimo “repuestos”, abreviatura “rep.” y cláusula sin monto.
- Umbrales de regresión fijados en `evaluacion-final.test.ts`.
- F1 cerrada; próxima fase: **F2 — captura offline**.

### 2026-11-20 — F1, sesión 5: categorías y confianza

- `clasificar.ts`: reglas por palabras clave con prioridad (reparación > insumo), confianza 0.95 en coincidencia y 0.6 en respaldo.
- Regla de **Otros + etiqueta** implementada: `2 kilos de arroz` → `otros` + `arroz`.
- Banderas de revisión por monto ausente, concepto vacío, segmentación dudosa, monto ambiguo y categoría dudosa.
- Medición en desarrollo: estructura 120/120, categorías 150/150.
- Pruebas del proyecto: **83**.
- Próximo paso: sesión 6 — medir reserva y adversarios, decidir enfoque y cerrar F1.

### 2026-11-20 — Decisiones de cuentas, suscripción y backups

- Retención escalonada: **7 diarios + 4 semanales + 12 mensuales + 3 manuales**.
- Backups generados en el **servidor**, no en el teléfono.
- Al vencer la suscripción: **bloqueo total** de la app; el login sigue para renovar y no se borran datos.
- Cuentas **creadas por el administrador**, asociadas a un correo y con autenticación obligatoria.
- **Un dispositivo por cuenta**, con la política del segundo teléfono aún por decidir.
- Pago fuera de alcance por ahora; activación manual.
- Diseño completo en `docs/CUENTAS_Y_BACKUPS.md`. F6 se parte en F6.1 y F6.2.

### 2026-11-20 — Modelo comercial: cuentas, suscripción y backups

- El proyecto deja de ser una app personal: se venderá por suscripción anual a varios clientes.
- Una cuenta por cliente, un usuario por cuenta; los datos se aíslan por cuenta en el servidor.
- Backup rotativo por cuenta: se conservan N copias y al agregar una nueva se elimina la más vieja.
- Impacto: F6 crece (cuentas + suscripción + backups + restauración). F1–F5 no cambian.
- Decisiones pendientes: retención y frecuencia de backups, política al vencer, pasarela de pago y método de autenticación.

### 2026-11-20 — F1, sesión 4: segmentación y concepto

- `parser.ts`: parte el mensaje por comas, punto y coma y “y”, une fragmentos sin monto (notas de voz), limpia concepto, detecta cantidad/unidad y equipo, y calcula el total cuando el precio es unitario.
- `medir-estructura.ts`: compara ítems, montos, conceptos, cantidades, unidades, equipos y bandera de revisión.
- Resultado en desarrollo: **120/120 (100%)**, otra vez un piso por compartir plantillas; la reserva sigue sin medir.
- Pruebas del proyecto: **68**.
- Próximo paso: sesión 5 — categorías (incluida la regla de Otros con etiqueta), confianza y banderas de revisión.

### 2026-11-20 — F1, sesión 3: extracción de montos

- `normalizar.ts`: minúsculas y sin tildes, conservando índices.
- `numeros.ts`: números en palabras (“dos mil quinientos”, “cuarenta y cinco mil”, “medio millón”).
- `monto.ts`: detección de montos con reglas para fechas, cantidades y precios unitarios.
- `medir-montos.ts`: medición por caso y por plantilla.
- Resultado en desarrollo: **120/120 (100%)**. Se toma como piso, no como prueba: el corpus de desarrollo comparte plantillas con las reglas. La prueba real es la reserva, al cierre.
- Pruebas del proyecto: **57**.
- Próximo paso: sesión 4 — segmentación, concepto, cantidad/unidad y equipo.

### 2026-11-20 — F1, sesión 2: corpus completo

- Se agregó a `WORKFLOW.md` la regla de **pruebas obligatorias** para todo cambio de dominio.
- El CI ahora corre en **cada push, de cualquier rama**, no solo en `main`.
- Generador reproducible (`scripts/generar-corpus.mjs`, semilla fija) con 11 plantillas.
- Corpus: 120 casos de desarrollo + 50 de reserva, con vocabulario distinto en la reserva.
- 11 pruebas de integridad del corpus (ids, textos, montos, categorías, Otros con etiqueta, revisión).
- Total de pruebas del proyecto: 27.
- Próximo paso: sesión 3 — normalización y extracción de monto.

### 2026-11-20 — F1, sesión 1: contrato y casos adversarios

- Se creó la rama `feat/f1-parser`.
- Contrato del parser definido en `src/domain/parser/types.ts` (borradores, confianza por campo, motivos de revisión).
- Regla de **Otros + etiqueta** incorporada al contrato y a la memoria.
- 27 casos adversarios escritos a mano en `corpus-adversarios.ts` (montos en palabras, decimales, fechas, multi-ítem, voz, “otros”…).
- Próximo paso: sesión 2 — generar corpus de desarrollo y de reserva.

### 2026-11-20 — Nombre definitivo y GitHub

- Se validó la app en el teléfono real: abre y navega correctamente.
- Se definió el nombre **GestCampo** (libre en Google Play) y se aplicó en `app.json`, `package.json`, README, configuración y memoria.
- Identificadores fijados: slug `gestcampo`, scheme `gestcampo`, package `com.gestcampo.app`.
- Repositorio creado en GitHub: `JuanPE-PNG/gestcampo` (privado), vía SSH.
- CI configurado: `.github/workflows/verify.yml` corre typecheck, lint y pruebas en cada push y PR.
- Próximo paso: arrancar **F1 — spike del parser** con datos sintéticos.

### 2026-11-18 — Inicio del proyecto (F0)

- Se creó el repositorio con Expo SDK 58, TypeScript y `expo-router`.
- Se limpió el scaffold de ejemplo y se dejó la estructura propia.
- Se definieron tokens visuales y las 4 pantallas base.
- Se implementaron tipos del dominio y la utilidad de dinero con pruebas.
- Se escribieron `docs/PROJECT_MEMORY.md` y `docs/WORKFLOW.md`.
- `npm run verify` en verde (typecheck, lint y 16 pruebas).
- Bundle Android validado con `expo export`.
- Próximo paso: probar en el teléfono real y arrancar F1 (spike del parser con datos sintéticos).
