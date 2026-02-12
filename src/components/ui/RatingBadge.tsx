import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SpotRating, RATING_LABELS, RATING_COLORS } from '../../types';
import { borderRadius, typography, spacing } from '../../theme';

interface RatingBadgeProps {
  rating: SpotRating;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function RatingBadge({ rating, size = 'md', showLabel = true }: RatingBadgeProps) {
  const backgroundColor = RATING_COLORS[rating];
  const label = RATING_LABELS[rating];

  const sizeStyles = {
    sm: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      fontSize: 10,
    },
    md: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs + 2,
      fontSize: 12,
    },
    lg: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      fontSize: 14,
    },
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
          paddingVertical: sizeStyles[size].paddingVertical,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          { fontSize: sizeStyles[size].fontSize },
        ]}
      >
        {showLabel ? label.toUpperCase() : rating.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
