import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { SurfSpot } from '../types';

interface SurfSpotCardProps {
  spot: SurfSpot;
  onPress?: () => void;
  showTopPick?: boolean;
  variant?: 'compact' | 'full';
}

export function SurfSpotCard({
  spot,
  onPress,
  showTopPick = false,
  variant = 'compact',
}: SurfSpotCardProps) {
  if (variant === 'compact') {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress}>
        <Text style={styles.compactName}>{spot.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.fullCard} onPress={onPress}>
      <View style={styles.fullCardContent}>
        <Text style={styles.fullCardName}>{spot.name}</Text>
        {spot.isTopPick && showTopPick && (
          <View style={styles.topPickBadge}>
            <Ionicons name="trophy-outline" size={14} color={colors.accent} />
            <Text style={styles.topPickText}>Top Pick</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

interface SearchCardProps {
  onPress?: () => void;
}

export function SearchCard({ onPress }: SearchCardProps) {
  return (
    <TouchableOpacity style={styles.searchCard} onPress={onPress}>
      <Ionicons name="search" size={24} color={colors.textPrimary} />
      <Text style={styles.searchText}>Search</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  compactCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.md,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  fullCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  fullCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullCardName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  topPickBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  topPickText: {
    ...typography.small,
    color: colors.accent,
    fontWeight: '500',
  },
  searchCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.md,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  searchText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});
