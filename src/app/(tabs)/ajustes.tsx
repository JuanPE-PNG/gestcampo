import { StyleSheet, Text, View } from 'react-native';

import { PhaseCard } from '@/components/phase-card';
import { Screen } from '@/components/screen';
import { APP_NAME, MONEDA } from '@/config';
import { colors, fontSize, radius, spacing } from '@/theme/tokens';

export default function AjustesScreen() {
  return (
    <Screen title="Ajustes" subtitle="Configuración de la app.">
      <PhaseCard
        fase="FASE F4"
        titulo="Categorías y catálogos"
        descripcion="Las categorías las crea el usuario. Siempre existe “Otros” como respaldo, para que ningún gasto quede sin lugar."
        puntos={[
          'Crear, renombrar y ordenar categorías.',
          'Borrar una categoría reasigna sus gastos a “Otros”.',
          'Reglas aprendidas a partir de las correcciones.',
        ]}
      />

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Información</Text>
        <Row label="Aplicación" value={APP_NAME} />
        <Row label="Moneda" value={MONEDA} />
        <Row label="Versión" value="0.1.0" />
        <Row label="Estado" value="Fase F0 · Fundaciones" />
      </View>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  infoTitle: {
    color: colors.text,
    fontSize: fontSize.subtitle,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSize.body,
  },
  value: {
    color: colors.text,
    fontSize: fontSize.body,
    fontWeight: '600',
  },
});
