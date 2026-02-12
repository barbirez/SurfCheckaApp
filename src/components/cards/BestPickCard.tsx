import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SurfSpot } from '../../types';
import { RatingBadge } from '../ui/RatingBadge';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BestPickCardProps {
  spot: SurfSpot;
  onPress: () => void;
}

export function BestPickCard({ spot, onPress }: BestPickCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, shadows.lg]}
      onPress={onPress}
      activeOpacity={0.95}
    >
      {/* Best Pick Badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.bestPickBadge}>
          <MaterialCommunityIcons name="surfing" size={16} color={colors.backgroundDark} />
          <Text style={styles.bestPickText}>Best pick</Text>
        </View>
      </View>

      {/* Image */}
      <Image source={{ uri: spot.imageUrl }} style={styles.image} />

      {/* Gradient overlay */}
      <View style={styles.gradientOverlay} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name}>{spot.name}</Text>
        <View style={styles.ratingRow}>
          <RatingBadge rating={spot.rating} size="md" />
          <Text style={styles.location}>{spot.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - spacing.lg * 2,
    height: 280,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: colors.backgroundCard,
    marginBottom: spacing.lg,
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  bestPickBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.round,
    gap: spacing.xs,
  },
  bestPickText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.backgroundDark,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    // Create a gradient effect from bottom
    backgroundImage: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7) 100%)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  location: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
