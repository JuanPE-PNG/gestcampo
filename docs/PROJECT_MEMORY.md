# Memoria del proyecto — Gastos de Finca

> **Última actualización:** 2026-11-18
> **Fase actual:** F0 — Fundaciones (en curso)
> **Versión de la app:** 0.1.0

---

## 0. Instrucciones para quien retome el proyecto

Este archivo es la fuente de contexto entre sesiones. Si estás leyendo esto en un chat nuevo:

1. **Leelo completo antes de escribir código.**
2. Leé también `docs/WORKFLOW.md`: el flujo de trabajo y las pruebas son obligatorios.
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

---

## 2. Restricciones del producto (no negociables)

- **Android únicamente.** Desarrollo con Expo.
- **Offline primero:** capturar e informar sin red. La red solo se necesita para sincronizar.
- **Un solo usuario.** Sin multiusuario, sin roles, sin permisos.
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
- Sincronización con nube, cuenta y respaldo (servidor + Drive).

**No entra:**

- iOS.
- Multiusuario.
- Presupuestos o alertas.
- OCR de recibos.
- Bot de WhatsApp.
- Integraciones contables.
- Gráficos avanzados.

---

## 4. Decisiones técnicas congeladas

| Tema | Decisión |
|---|---|
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

---

## 7. Roadmap y estado

| Fase | Alcance | Estado |
|---|---|---|
| **F0** | Fundaciones: repo, Expo, estructura, tema, documentación, pruebas | **En curso** |
| F1 | Spike del parser con datos de prueba | Pendiente |
| F2 | Captura offline (chat + persistencia) | Pendiente |
| F3 | Gastos estructurados (parser, edición, historial, anulación) | Pendiente |
| F4 | Días, categorías y flujo de revisión | Pendiente |
| F5 | Informes PDF + exportación Excel | Pendiente |
| F6 | Cuenta, nube, sincronización y respaldo | Pendiente |
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
- [ ] Probar en dispositivo Android real.
- [ ] Crear build de desarrollo (EAS o `expo run:android`).

---

## 8. Estado actual del repositorio

**Funciona:**

- La app compila y navega entre las 4 pestañas.
- Cada pantalla muestra su fase y lo que va a incluir.
- `parsearMonto` / `formatearMonto` con pruebas unitarias.
- `npm run verify` ejecuta typecheck, lint y tests.

**No existe todavía:**

- Base de datos local ni migraciones.
- Persistencia de mensajes.
- Parser.
- Categorías.
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
- **Package Android:** `com.gastosfinca.app` es provisional; se puede cambiar antes de publicar.
- **Backend:** Supabase no está creado. Hace falta cuenta, proyecto y claves (fase F6).
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

### 2026-11-18 — Inicio del proyecto (F0)

- Se creó el repositorio con Expo SDK 58, TypeScript y `expo-router`.
- Se limpió el scaffold de ejemplo y se dejó la estructura propia.
- Se definieron tokens visuales y las 4 pantallas base.
- Se implementaron tipos del dominio y la utilidad de dinero con pruebas.
- Se escribieron `docs/PROJECT_MEMORY.md` y `docs/WORKFLOW.md`.
- `npm run verify` en verde (typecheck, lint y 16 pruebas).
- Bundle Android validado con `expo export`.
- Próximo paso: probar en el teléfono real y arrancar F1 (spike del parser con datos sintéticos).
