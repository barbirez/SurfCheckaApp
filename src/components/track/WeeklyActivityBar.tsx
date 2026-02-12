import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeeklyActivity } from '../../types';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';

interface WeeklyActivityBarProps {
  weeklyActivity: WeeklyActivity[];
  onPress: () => void;
}

export function WeeklyActivityBar({ weeklyActivity, onPress }: WeeklyActivityBarProps) {
  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  const sessionsThisWeek = weeklyActivity.filter((day) => day.hasSurfed).length;

  return (
    <TouchableOpacity
      style={[styles.container, shadows.sm]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Sua Semana</Text>
        <Text style={styles.subtitle}>
          {sessionsThisWeek} {sessionsThisWeek === 1 ? 'sessão' : 'sessões'}
        </Text>
      </View>

      <View style={styles.daysContainer}>
        {weeklyActivity.map((day, index) => (
          <View key={day.date} style={styles.dayColumn}>
            <View
              style={[
                styles.dot,
                day.hasSurfed ? styles.dotActive : styles.dotInactive,
              ]}
            />
            <Text style={styles.dayLabel}>{getDayLabel(day.date)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Toque para ver o calendário completo</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: colors.backgroundDark,
    borderWidth: 1,
    borderColor: colors.textMuted,
  },
  dayLabel: {
    ...typography.small,
    color: colors.textMuted,
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundDark,
  },
  footerText: {
    ...typography.small,
    color: colors.textMuted,
  },
});
