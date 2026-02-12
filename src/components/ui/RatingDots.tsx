import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SpotRating, RATING_VALUES, RATING_LABELS, RATING_COLORS } from '../../types';
import { colors, borderRadius, typography, spacing } from '../../theme';

interface RatingDotsProps {
  rating: SpotRating;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingDots({ rating, showLabel = true, size = 'md' }: RatingDotsProps) {
  const ratingValue = RATING_VALUES[rating];
  const label = RATING_LABELS[rating];
  const color = RATING_COLORS[rating];

  const dotSizes = {
    sm: 6,
    md: 8,
    lg: 10,
  };

  const dotSize = dotSizes[size];
  const gap = size === 'sm' ? 4 : 6;

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
      )}
      <View style={[styles.dotsContainer, { gap }]}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <View
            key={dot}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: dot <= ratingValue ? color : colors.backgroundCard,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    ...typography.label,
    letterSpacing: 1.5,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    // Size set dynamically
  },
});
