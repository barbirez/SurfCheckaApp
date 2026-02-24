import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { RootStackParamList, SurfSession } from '../../types';
import { WeeklyActivityBar, CalendarView } from '../../components/track';
import { FilterPill } from '../../components/ui';
import { SessionLogCard } from '../../components/cards';
import {
  mockSessions,
  mockConsistencyStats,
  generateWeeklyActivity,
} from '../../data/mockData';
import { t } from '../../i18n';

type TrackScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function TrackScreen({ navigation }: TrackScreenProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SurfSession | null>(null);

  const weeklyActivity = generateWeeklyActivity(mockSessions);

  const handleLogSession = () => {
    navigation.navigate('CheckIn', {});
  };

  const handleCalendarOpen = () => {
    setShowCalendar(true);
  };

  const handleSelectSession = (session: SurfSession) => {
    setSelectedSession(session);
    setShowCalendar(false);
    // Could navigate to session detail or show modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Seu Surf</Text>
            <Text style={styles.subtitle}>Acompanhe sua consistência</Text>
          </View>
          <FilterPill
            label="Registrar"
            active
            onPress={handleLogSession}
          />
        </View>

        {/* Weekly Activity Bar */}
        <View style={styles.weeklySection}>
          <WeeklyActivityBar
            weeklyActivity={weeklyActivity}
            onPress={handleCalendarOpen}
          />
        </View>

        {/* Consistency Stats */}
        <View style={[styles.statsCard, shadows.sm]}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockConsistencyStats.totalSessions}</Text>
              <Text style={styles.statLabel}>Sessões</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockConsistencyStats.totalHours}h</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mockConsistencyStats.averageSessionLength}min</Text>
              <Text style={styles.statLabel}>Média</Text>
            </View>
          </View>
          {mockConsistencyStats.favoriteSpot && (
            <View style={styles.favoriteSpot}>
              <Ionicons name="heart" size={14} color={colors.accent} />
              <Text style={styles.favoriteSpotText}>
                Pico favorito: {mockConsistencyStats.favoriteSpot}
              </Text>
            </View>
          )}
        </View>

        {/* Latest Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ÚLTIMAS SESSÕES</Text>
            <TouchableOpacity onPress={handleCalendarOpen}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          {mockSessions.length > 0 ? (
            mockSessions.slice(0, 5).map((session) => (
              <SessionLogCard
                key={session.id}
                session={session}
                onPress={() => setSelectedSession(session)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="water-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>
                Nenhuma sessão registrada ainda.{'\n'}
                Comece a rastrear seu surf!
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Calendar Modal */}
      <CalendarView
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        sessions={mockSessions}
        onSelectSession={handleSelectSession}
      />
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.pageTitle,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  weeklySection: {
    paddingHorizontal: spacing.lg,
  },
  statsCard: {
    backgroundColor: colors.backgroundCard,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.backgroundDark,
  },
  statValue: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  favoriteSpot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundDark,
    gap: spacing.xs,
  },
  favoriteSpotText: {
    ...typography.small,
    color: colors.textMuted,
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.textMuted,
  },
  seeAllText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
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
