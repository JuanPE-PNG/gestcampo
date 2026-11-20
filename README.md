# GestCampo

Aplicación Android para registrar los gastos del día desde el campo, sin internet, y generar informes en PDF y Excel desde el teléfono.

> Tus cuentas del campo, al día.

Reemplaza el traspaso manual de notas de WhatsApp a Excel.

## Requisitos

- Node.js 22 o superior
- npm
- Android (teléfono real para las pruebas finales)

## Puesta en marcha

```bash
npm install
npm start        # servidor de desarrollo
npm run android  # abrir en Android
```

## Verificación

```bash
npm run verify   # typecheck + lint + tests (obligatorio antes de cada push)
```

## Estructura

```
src/
  app/          rutas de Expo Router (pantallas)
  components/   componentes de interfaz reutilizables
  domain/       lógica de negocio pura y testeable
  theme/        tokens visuales
docs/
  PROJECT_MEMORY.md   estado, decisiones y roadmap del proyecto
  WORKFLOW.md         flujo de trabajo, pushes y pruebas obligatorias
```

## Estado

Fase **F0 — Fundaciones**. Ver `docs/PROJECT_MEMORY.md` para el detalle y `docs/WORKFLOW.md` antes de tocar código.
