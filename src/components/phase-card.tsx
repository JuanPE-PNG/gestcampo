import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/theme/tokens';

type PhaseCardProps = {
  fase: string;
  titulo: string;
  descripcion: string;
  puntos?: string[];
};

/**
 * Tarjeta de estado de desarrollo.
 * Existe solo mientras la app está en construcción: cada pantalla indica
 * a qué fase pertenece y qué hará cuando esté terminada.
 */
export function PhaseCard({ fase, titulo, descripcion, puntos }: PhaseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{fase}</Text>
      </View>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.description}>{descripcion}</Text>
      {puntos?.length ? (
        <View style={styles.list}>
          {puntos.map((punto) => (
            <Text key={punto} style={styles.item}>
              • {punto}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    color: colors.onPrimary,
    fontSize: fontSize.caption,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.subtitle,
    fontWeight: '600',
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSize.body,
    lineHeight: 22,
  },
  list: {
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  item: {
    color: colors.text,
    fontSize: fontSize.body,
    lineHeight: 22,
  },
});
