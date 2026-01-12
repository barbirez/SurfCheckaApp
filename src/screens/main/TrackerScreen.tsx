import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { RootStackParamList, SurfSession, SurfStreak } from '../../types';
import { t } from '../../i18n';

type TrackerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Mock data for streaks
const mockStreak: SurfStreak = {
  currentStreak: 5,
  longestStreak: 12,
  totalSessions: 47,
  totalHours: 94,
  thisMonthSessions: 8,
};

// Mock sessions
const mockSessions: SurfSession[] = [
  {
    id: '1',
    date: '2024-01-12',
    duration: 120,
    spotId: '1',
    spotName: 'Campeche',
    conditionRating: 4,
    surfRating: 5,
    notes: 'Ondas perfeitas hoje!',
  },
  {
    id: '2',
    date: '2024-01-10',
    duration: 90,
    spotId: '2',
    spotName: 'Joaquina',
    conditionRating: 3,
    surfRating: 4,
  },
  {
    id: '3',
    date: '2024-01-08',
    duration: 60,
    spotId: '1',
    spotName: 'Campeche',
    conditionRating: 4,
    surfRating: 4,
  },
  {
    id: '4',
    date: '2024-01-06',
    duration: 75,
    spotId: '3',
    spotName: 'Praia Mole',
    conditionRating: 3,
    surfRating: 3,
  },
];

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

function SessionCard({ session }: { session: SurfSession }) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <View style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <View>
          <Text style={styles.sessionSpot}>{session.spotName}</Text>
          <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
        </View>
        <View style={styles.sessionDuration}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.durationText}>{formatDuration(session.duration)}</Text>
        </View>
      </View>

      <View style={styles.sessionRatings}>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>{t.surfTracker.checkIn.conditionRating}</Text>
          <StarRating rating={session.conditionRating} />
        </View>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>{t.surfTracker.checkIn.surfRating}</Text>
          <StarRating rating={session.surfRating} />
        </View>
      </View>

      {session.notes && (
        <Text style={styles.sessionNotes}>{session.notes}</Text>
      )}
    </View>
  );
}

export function TrackerScreen({ navigation }: TrackerScreenProps) {
  const handleCheckIn = () => {
    navigation.navigate('CheckIn', {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t.surfTracker.title}</Text>
          <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
            <Ionicons name="add" size={20} color={colors.textPrimary} />
            <Text style={styles.checkInText}>{t.surfTracker.logSession}</Text>
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakMain}>
            <MaterialCommunityIcons name="fire" size={40} color={colors.accent} />
            <View style={styles.streakInfo}>
              <Text style={styles.streakNumber}>{mockStreak.currentStreak}</Text>
              <Text style={styles.streakLabel}>{t.surfTracker.days}</Text>
            </View>
          </View>
          <Text style={styles.streakTitle}>{t.surfTracker.yourStreak}</Text>

          <View style={styles.streakStats}>
            <View style={styles.streakStat}>
              <Text style={styles.statNumber}>{mockStreak.thisMonthSessions}</Text>
              <Text style={styles.statLabel}>{t.surfTracker.thisMonth}</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakStat}>
              <Text style={styles.statNumber}>{mockStreak.totalSessions}</Text>
              <Text style={styles.statLabel}>{t.surfTracker.sessions}</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakStat}>
              <Text style={styles.statNumber}>{mockStreak.totalHours}h</Text>
              <Text style={styles.statLabel}>{t.surfTracker.totalHours}</Text>
            </View>
          </View>
        </View>

        {/* Recent Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.surfTracker.recentSessions}</Text>
          {mockSessions.length > 0 ? (
            mockSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="surfing" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>{t.surfTracker.emptyState}</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    gap: spacing.xs,
  },
  checkInText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  streakCard: {
    backgroundColor: colors.backgroundCard,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  streakMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  streakInfo: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  streakLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  streakTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  streakStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  streakStat: {
    flex: 1,
    alignItems: 'center',
  },
  streakDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.backgroundDark,
  },
  statNumber: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.small,
    color: colors.textMuted,
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  sessionCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  sessionSpot: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  sessionDate: {
    ...typography.small,
    color: colors.textMuted,
  },
  sessionDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  durationText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  sessionRatings: {
    gap: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingLabel: {
    ...typography.small,
    color: colors.textMuted,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  sessionNotes: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
