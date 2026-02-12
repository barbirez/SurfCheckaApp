import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SurfSpot } from '../../types';
import { RatingBadge } from '../ui/RatingBadge';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SpotCardWithImageProps {
  spot: SurfSpot;
  onPress: () => void;
  variant?: 'full' | 'compact';
}

export function SpotCardWithImage({ spot, onPress, variant = 'full' }: SpotCardWithImageProps) {
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.compactCard, shadows.md]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={{ uri: spot.imageUrl }} style={styles.compactImage} />
        <View style={styles.compactOverlay} />
        <View style={styles.compactContent}>
          <RatingBadge rating={spot.rating} size="sm" />
          <Text style={styles.compactName} numberOfLines={1}>
            {spot.name}
          </Text>
          <Text style={styles.compactLocation} numberOfLines={1}>
            {spot.location}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.fullCard, shadows.md]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: spot.imageUrl }} style={styles.fullImage} />
      <View style={styles.fullContent}>
        <View style={styles.fullHeader}>
          <View style={styles.fullInfo}>
            <Text style={styles.fullName}>{spot.name}</Text>
            <Text style={styles.fullLocation}>{spot.location}</Text>
          </View>
          <RatingBadge rating={spot.rating} size="md" />
        </View>
        {spot.distance && (
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.distanceText}>{spot.distance}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Compact variant styles
  compactCard: {
    width: SCREEN_WIDTH * 0.4,
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.backgroundCard,
  },
  compactImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  compactOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  compactContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  compactName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  compactLocation: {
    ...typography.small,
    color: colors.textSecondary,
  },

  // Full variant styles
  fullCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  fullImage: {
    width: '100%',
    height: 140,
  },
  fullContent: {
    padding: spacing.md,
  },
  fullHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  fullInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  fullName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  fullLocation: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  distanceText: {
    ...typography.small,
    color: colors.textMuted,
  },
});
