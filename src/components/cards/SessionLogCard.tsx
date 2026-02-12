import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SurfSession } from '../../types';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { BEACH_IMAGES } from '../../data/mockData';

interface SessionLogCardProps {
  session: SurfSession;
  onPress?: () => void;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={size}
          color={star <= rating ? colors.accent : colors.textMuted}
        />
      ))}
    </View>
  );
}

export function SessionLogCard({ session, onPress }: SessionLogCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const imageUrl = session.spotImageUrl || BEACH_IMAGES.surf1;

  return (
    <TouchableOpacity
      style={[styles.card, shadows.sm]}
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
      disabled={!onPress}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>{formatDate(session.date)}</Text>
          <Text style={styles.duration}>{formatDuration(session.duration)}</Text>
        </View>
        <Text style={styles.spotName}>{session.spotName}</Text>
        <View style={styles.ratingRow}>
          <StarRating rating={session.surfRating} />
        </View>
        {session.notes && (
          <Text style={styles.notes} numberOfLines={1}>
            {session.notes}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
  duration: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '600',
  },
  spotName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  notes: {
    ...typography.small,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
});
