import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { TimeSlot } from '../types';

interface ConditionsCardProps {
  timeSlots: TimeSlot[];
  activeSlot: number;
  onSlotChange?: (index: number) => void;
}

export function ConditionsCard({ timeSlots, activeSlot }: ConditionsCardProps) {
  const currentConditions = timeSlots[activeSlot]?.conditions;

  if (!currentConditions) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>CONDITIONS TODAY</Text>

      <View style={styles.card}>
        {/* Time tabs */}
        <View style={styles.timeTabs}>
          {timeSlots.map((slot, index) => (
            <View
              key={index}
              style={[styles.timeTab, index === activeSlot && styles.activeTimeTab]}
            >
              <Text
                style={[
                  styles.timeTabText,
                  index === activeSlot && styles.activeTimeTabText,
                ]}
              >
                {slot.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Conditions grid */}
        <View style={styles.conditionsGrid}>
          {/* Row 1 - Labels */}
          <View style={styles.conditionsRow}>
            <View style={styles.conditionItem}>
              <MaterialCommunityIcons
                name="wave"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.conditionLabel}>SIZE</Text>
            </View>
            <View style={styles.conditionItem}>
              <Ionicons name="timer-outline" size={16} color={colors.primary} />
              <Text style={styles.conditionLabel}>PERIOD</Text>
            </View>
            <View style={styles.conditionItem}>
              <MaterialCommunityIcons
                name="weather-windy"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.conditionLabel}>WIND</Text>
            </View>
            <View style={styles.conditionItem}>
              <MaterialCommunityIcons
                name="waves"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.conditionLabel}>SWELL</Text>
            </View>
          </View>

          {/* Row 2 - Primary values */}
          <View style={styles.conditionsRow}>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionValue}>{currentConditions.size}</Text>
            </View>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionValue}>
                {currentConditions.windDirection}{' '}
                <Ionicons name="caret-down" size={12} color={colors.textPrimary} />
              </Text>
            </View>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionValue}>
                {currentConditions.windDirection}{' '}
                <Ionicons name="caret-down" size={12} color={colors.textPrimary} />
              </Text>
            </View>
            <View style={styles.conditionItem}>
              <Ionicons name="caret-up" size={16} color={colors.textPrimary} />
            </View>
          </View>

          {/* Row 3 - Secondary values */}
          <View style={styles.conditionsRow}>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionSecondary}>
                {currentConditions.swell}
              </Text>
            </View>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionSecondary}>
                {currentConditions.period}
              </Text>
            </View>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionSecondary}>
                {currentConditions.windSpeed}kph
              </Text>
            </View>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionSecondary}>
                {currentConditions.swellHeight}m
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.lg,
    overflow: 'hidden',
  },
  timeTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  timeTab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  activeTimeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.textPrimary,
  },
  timeTabText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  activeTimeTabText: {
    color: colors.textPrimary,
  },
  conditionsGrid: {
    padding: spacing.md,
  },
  conditionsRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  conditionItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  conditionLabel: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  conditionValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  conditionSecondary: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
