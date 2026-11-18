# Guía de trabajo — pushes y pruebas

> **Carácter obligatorio.** Ningún cambio se sube sin cumplir esta guía.
> Si algo de acá no se puede cumplir, se discute antes, no se saltea.

---

## 1. Regla de oro

**`main` siempre compila, siempre pasa las pruebas y siempre se puede abrir.**

Si `main` está roto, lo primero es arreglarlo; no se empieza nada nuevo.

---

## 2. Flujo obligatorio de cada cambio

1. `git pull` (cuando exista remoto).
2. Crear rama: `git switch -c feat/f2-chat-offline`.
3. Desarrollar en pasos chicos.
4. Ejecutar **`npm run verify`** (typecheck + lint + tests).
5. Probar en el teléfono real con el checklist de §6.
6. Commit(s) con el formato de §4.
7. Volver a `main` y hacer merge (solo si el paso 4 y 5 pasaron).
8. Actualizar `docs/PROJECT_MEMORY.md` (§7, §8, §9, §11).
9. `git push`.

**Nunca** se hace push directo de trabajo a medias. **Nunca** se usa `--no-verify`.

---

## 3. Ramas

| Prefijo | Uso | Ejemplo |
|---|---|---|
| `feat/` | funcionalidad nueva | `feat/f3-parser-montos` |
| `fix/` | corrección de error | `fix/f2-perdida-mensajes` |
| `refactor/` | reestructura sin cambiar comportamiento | `refactor/domain-gastos` |
| `docs/` | documentación | `docs/memoria-f3` |
| `chore/` | configuración, dependencias | `chore/jest-config` |

Una rama = un tema. Si aparece otra cosa, se abre otra rama.

---

## 4. Commits

Formato: **Conventional Commits**, en español y en imperativo.

```
feat(chat): guardar mensajes en sqlite
fix(money): interpretar montos con punto de miles
test(parser): agregar casos de montos ambiguos
refactor(domain): separar agregación de informes
docs(memory): actualizar estado de la fase f2
chore(deps): actualizar expo-sqlite
```

Reglas:

- Un commit = un cambio lógico.
- El mensaje dice **qué** y **por qué**, no “cambios”.
- No se commitean secretos, `node_modules`, bases locales ni archivos exportados.
- Antes de cada commit: `npm run verify`.

---

## 5. Verificación automática (obligatoria)

```bash
npm run verify
```

Equivale a:

| Comando | Qué exige |
|---|---|
| `npm run typecheck` | 0 errores de TypeScript, sin `any` injustificados |
| `npm run lint` | 0 errores de ESLint |
| `npm test` | Todos los tests en verde |

**Criterio de aprobación:** los tres pasan, sin excepciones ni `skip`.

Si un test falla por un cambio de diseño, se actualiza el test **en el mismo commit** y se explica en el mensaje.

---

## 6. Pruebas manuales obligatorias

Además de lo automático, cada cambio se prueba en el **teléfono Android real**. El emulador no cuenta como prueba final.

### Checklist general (siempre)

- [ ] La app abre sin pantalla roja ni errores en Metro.
- [ ] Se navega entre las 4 pestañas sin trabas.
- [ ] No hay advertencias nuevas en la consola.
- [ ] La app se cierra y se vuelve a abrir sin perder datos (cuando exista persistencia).

### Checklist por fase

**F0 (actual):**

- [ ] `npm run verify` en verde.
- [ ] Instala y abre en el teléfono.
- [ ] Las 4 pestañas muestran su contenido.
- [ ] El texto se lee bien al sol y con una mano.

**F2 en adelante (captura):**

- [ ] Modo avión: escribir 20 mensajes.
- [ ] Matar la app desde el sistema y reabrir: no se pierde ninguno.
- [ ] Recuperar conexión: los mensajes siguen ahí.
- [ ] Guardado percibido como instantáneo (menos de 100 ms).

**F6 en adelante (sincronización):**

- [ ] Cortar la red a mitad del envío: no se pierde nada y se reintenta.
- [ ] Sincronizar dos veces: no se duplica nada.
- [ ] Reinstalar la app y restaurar: historial completo.

---

## 7. Estrategia de pruebas

De mayor a menor prioridad:

1. **Dominio puro (unitarias).** Dinero, parser, agregaciones, reglas de categorías. Es donde más valor hay y donde los tests son baratos.
2. **Datos (integración).** Repositorios contra SQLite: guardar, leer, migrar, anular.
3. **Sincronización (caos).** Cortes, duplicados, reintentos, restauración.
4. **Informes (conciliación).** El total en pantalla, en el PDF y en el Excel debe coincidir exactamente.
5. **UI (manual).** Sin tests automáticos de interfaz en la v1: se prueba a mano, en el teléfono.

**Regla:** ninguna lógica de negocio vive en un componente de pantalla. Si está en el dominio, se puede testear.

---

## 8. Definición de terminado

Un cambio está terminado cuando:

- [ ] Cumple el criterio de aceptación de su fase (ver `PROJECT_MEMORY.md` §7).
- [ ] `npm run verify` pasa.
- [ ] Se probó en el teléfono real, incluido el modo avión si aplica.
- [ ] No rompe datos existentes (migraciones probadas).
- [ ] La memoria del proyecto quedó actualizada.

---

## 9. Datos y secretos

- **Nunca** se commitea: `.env`, claves de Supabase, keystores, bases de datos locales, exports de prueba.
- Los secretos se guardan en `.env.local` (ignorado) y, cuando exista backend, en EAS Secrets.
- Cuando haga falta una variable nueva, se documenta en `.env.example` sin valor real.
- Los datos de prueba son **sintéticos**. Nunca se suben datos reales del usuario al repositorio.

---

## 10. Cierre de sesión (checklist)

Antes de terminar una sesión de trabajo:

- [ ] `npm run verify` en verde.
- [ ] `docs/PROJECT_MEMORY.md` actualizado: fase, estado, deudas y bitácora.
- [ ] Commit con mensaje claro.
- [ ] Push (si hay remoto).
- [ ] Queda anotado el **próximo paso concreto** en la bitácora.

---

## 11. Versiones y rollback

- Cada hito usable se etiqueta: `git tag v0.1.0`, `v0.2.0`, etc.
- Para deshacer un cambio ya integrado: `git revert <commit>`, nunca reescribir `main`.
- Antes de una fase riesgosa (F6), se crea una rama de respaldo y un tag.

---

## 12. Release (cuando aplique)

- Build con EAS (`eas build --platform android`).
- Primero pista interna de Play Store; después producción.
- No se publica sin haber completado el checklist de F8 y dos semanas de uso real.
