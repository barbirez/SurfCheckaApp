import React, { useState } from 'react';
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
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { RootStackParamList, SpotRating } from '../../types';
import { RatingBadge, RatingDots } from '../../components/ui';
import { mockSpots, getTopRatedSpots } from '../../data/mockData';
import { t } from '../../i18n';

type ConditionsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type TimeSlotType = 'morning' | 'afternoon' | 'evening';

export function ConditionsScreen({ navigation }: ConditionsScreenProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlotType>('afternoon');

  const topSpots = getTopRatedSpots(5);

  const timeSlots = [
    { id: 'morning' as TimeSlotType, label: 'Manhã', icon: 'sunny-outline' },
    { id: 'afternoon' as TimeSlotType, label: 'Tarde', icon: 'partly-sunny-outline' },
    { id: 'evening' as TimeSlotType, label: 'Noite', icon: 'moon-outline' },
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const handleSpotPress = (spotId: string) => {
    navigation.navigate('SpotDetails', { spotId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getTimeGreeting()}!</Text>
          <Text style={styles.title}>Condições de Hoje</Text>
        </View>

        {/* Time Slot Selector */}
        <View style={styles.timeSlotContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlotButton,
                selectedTimeSlot === slot.id && styles.timeSlotButtonActive,
              ]}
              onPress={() => setSelectedTimeSlot(slot.id)}
            >
              <Ionicons
                name={slot.icon as keyof typeof Ionicons.glyphMap}
                size={20}
                color={selectedTimeSlot === slot.id ? colors.primary : colors.textMuted}
              />
              <Text
                style={[
                  styles.timeSlotText,
                  selectedTimeSlot === slot.id && styles.timeSlotTextActive,
                ]}
              >
                {slot.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overview Card */}
        <View style={[styles.overviewCard, shadows.md]}>
          <View style={styles.overviewHeader}>
            <MaterialCommunityIcons name="waves" size={24} color={colors.primary} />
            <Text style={styles.overviewTitle}>Visão Geral</Text>
          </View>
          <Text style={styles.overviewText}>
            Condições boas para surf na região. Ondas de 0.8m a 1.5m com período de 8-10s.
            Vento de SSE favorável pela manhã.
          </Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <Text style={styles.statValue}>1.2m</Text>
              <Text style={styles.statLabel}>Ondas</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewStat}>
              <Text style={styles.statValue}>9s</Text>
              <Text style={styles.statLabel}>Período</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewStat}>
              <Text style={styles.statValue}>12km/h</Text>
              <Text style={styles.statLabel}>Vento</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewStat}>
              <Text style={styles.statValue}>24°C</Text>
              <Text style={styles.statLabel}>Temp</Text>
            </View>
          </View>
        </View>

        {/* Spots Conditions List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONDIÇÕES POR PRAIA</Text>
          {topSpots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              style={[styles.spotConditionCard, shadows.sm]}
              onPress={() => handleSpotPress(spot.id)}
              activeOpacity={0.9}
            >
              <View style={styles.spotHeader}>
                <View>
                  <Text style={styles.spotName}>{spot.name}</Text>
                  <Text style={styles.spotLocation}>{spot.location}</Text>
                </View>
                <RatingBadge rating={spot.rating} size="sm" />
              </View>
              <View style={styles.spotConditions}>
                <View style={styles.conditionItem}>
                  <Ionicons name="water-outline" size={16} color={colors.textMuted} />
                  <Text style={styles.conditionValue}>{spot.conditions.size}</Text>
                </View>
                <View style={styles.conditionItem}>
                  <Ionicons name="timer-outline" size={16} color={colors.textMuted} />
                  <Text style={styles.conditionValue}>{spot.conditions.period}</Text>
                </View>
                <View style={styles.conditionItem}>
                  <MaterialCommunityIcons name="weather-windy" size={16} color={colors.textMuted} />
                  <Text style={styles.conditionValue}>{spot.conditions.windSpeed}km/h {spot.conditions.windDirection}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  timeSlotButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundCard,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  timeSlotButtonActive: {
    backgroundColor: colors.primary + '20',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  timeSlotText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '500',
  },
  timeSlotTextActive: {
    color: colors.primary,
  },
  overviewCard: {
    backgroundColor: colors.backgroundCard,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  overviewTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  overviewText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  overviewStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewStat: {
    flex: 1,
    alignItems: 'center',
  },
  overviewDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.backgroundDark,
  },
  statValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  spotConditionCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  spotName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  spotLocation: {
    ...typography.small,
    color: colors.textMuted,
  },
  spotConditions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  conditionValue: {
    ...typography.small,
    color: colors.textSecondary,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
