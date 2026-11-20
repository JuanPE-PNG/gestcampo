# Cuentas, suscripción y backups

> Decisiones tomadas el 2026-11-20. Se implementan en **F6.1** y **F6.2**.
> Este documento manda sobre cualquier otra nota anterior.

---

## 1. Modelo de cuentas

- El producto es **multi-cliente**: cada cliente tiene su propia cuenta y solo ve sus datos.
- **Una cuenta por cliente, un usuario por cuenta.** No hay varios usuarios dentro de una misma cuenta.
- **Las cuentas las crea el administrador.** No hay registro público.
- El identificador de la cuenta es un **correo electrónico**.
- **Autenticación obligatoria** para usar la app.
- Los datos de cada cuenta están **aislados** en el servidor y **cifrados en reposo**; el tránsito va por TLS.
- Las contraseñas se guardan con hash (Supabase Auth), nunca en texto plano.

## 2. Entidades del servidor

| Entidad | Campos |
|---|---|
| **cuenta** | id, email, nombre, estado (`activa` / `suspendida` / `eliminada`), creada_en |
| **suscripción** | cuenta_id, plan (`anual`), inicio, **vence**, estado (`vigente` / `vencida` / `cancelada`) |
| **backup** | id, cuenta_id, creado_en, nivel (`diario` / `semanal` / `mensual` / `manual`), ruta, bytes, hash, estado |
| **dispositivo** | id, cuenta_id, device_id, ultimo_acceso, version_app, activo |
| **auditoría** | id, cuenta_id, acción, detalle, creado_en |

## 3. Suscripción

- Plan **anual**. Estado vigente mientras `hoy <= vence` y no esté cancelada.
- **Al vencer: bloqueo total de la app.** No hay modo de solo lectura.
  - El inicio de sesión sigue funcionando para que el cliente pueda renovar.
  - **Los datos y los backups no se borran.** Al renovar, todo vuelve.
- El servidor es la autoridad. El teléfono guarda una **licencia local firmada** con la fecha de vencimiento para poder validar sin red.
- **Pago:** fuera de alcance por ahora. La activación y la renovación las hace el administrador. La pasarela se integra más adelante.

## 4. Backups

- Los genera **el servidor**, no el teléfono.
- Son fotos del estado sincronizado de la cuenta en un momento dado.
- Formato: volcado comprimido y cifrado en reposo, con hash SHA-256.
- Se guardan en almacenamiento privado; se descargan con URL firmada y temporal.

### Retención escalonada

| Nivel | Copias | Regla |
|---|---|---|
| Diario | 7 | Una por día con cambios |
| Semanal | 4 | La del domingo (o la última de la semana) |
| Mensual | 12 | La del día 1 (o la última del mes) |
| Manual | 3 | Antes de restaurar o a pedido |
| **Total** | **26** | |

- Solo se crea una copia si el **hash de los datos cambió**.
- Al superar el cupo de un nivel, se elimina la más vieja **de ese nivel**.
- Un año de gastos ocupa del orden de 1 MB comprimido: 26 copias son baratas.

### Ejemplo de rotación diaria

Con 7 diarios: `1, 2, 3, 4, 5, 6, 7` → entra 8 → `2, 3, 4, 5, 6, 7, 8`.
La misma regla aplica a semanales y mensuales.

## 5. Restauración

1. El cliente reinstala e inicia sesión.
2. El servidor devuelve el estado de la cuenta, la suscripción y la lista de backups (nivel, fecha, tamaño).
3. La app ofrece:
   - **Continuar con lo último** (sincronización normal).
   - **Restaurar una copia** concreta.
4. Antes de restaurar se crea automáticamente una copia **manual** del estado actual.
5. Se descarga la copia, se reemplaza la base local y se sincroniza.
6. Queda registro en auditoría: quién, cuándo y desde qué copia.

## 6. Dispositivo

- **Decisión pendiente.** Por ahora se asume **un dispositivo activo por cuenta**.
- Opciones cuando alguien inicia sesión en un segundo teléfono:
  - **Bloquear** el segundo dispositivo.
  - **Transferir**: se desactiva el anterior y queda activo el nuevo.
- Recomendación: transferir con confirmación explícita, porque el caso real es “cambié de teléfono”, no “uso dos a la vez”.

## 7. Seguridad

- Aislamiento por fila (RLS) en todas las tablas.
- Almacenamiento privado y URLs firmadas para los backups.
- Registro de auditoría para activaciones, restauraciones y cambios de dispositivo.
- Contraseñas con hash; nunca se envían ni se guardan en claro.

## 8. Roadmap

| Fase | Alcance | Estimación |
|---|---|---|
| **F6.1** | Cuentas, autenticación, aislamiento por cuenta y sincronización | ~2.5 semanas |
| **F6.2** | Suscripción, licencia offline, backups escalonados y restauración | ~1.5–2 semanas |

### Criterios de aceptación de F6.1

- Un cliente no puede ver ni escribir datos de otro.
- Reinstalar e iniciar sesión recupera el estado sincronizado.
- La app sigue capturando sin red.

### Criterios de aceptación de F6.2

- Al vencer, la app queda bloqueada y el login sigue disponible.
- Se crean y rotan los 7 + 4 + 12 backups sin intervención.
- Restaurar una copia deja los datos exactamente como estaban y genera la copia previa.

## 9. Decisiones abiertas

- **Dispositivo único:** ¿bloquear el segundo o transferir?
- **Cifrado:** en reposo (actual) vs. extremo a extremo (impediría que el servidor lea los backups).
- **Pasarela de pago:** se ignora por ahora.
