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
import { SurfSpotCard } from '../../components';
import { useUser } from '../../context/UserContext';
import { RootStackParamList, SurfSpot } from '../../types';
import { t } from '../../i18n';

type RecommendationsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Recommendations'>;
};

// Mock recommended spots in Portuguese
const mockRecommendedSpots: SurfSpot[] = [
  {
    id: '1',
    name: 'Campeche',
    location: 'Florianópolis, SC',
    conditions: {
      size: '1.3m',
      sizeValue: 1.3,
      period: '10s',
      periodValue: 10,
      wind: 'SSE',
      windSpeed: 12,
      windDirection: 'S',
      swell: '1.5m',
      swellHeight: 1.5,
      weather: 'Ensolarado',
      temperature: 24,
    },
    rating: 4.8,
    isTopPick: true,
  },
  {
    id: '2',
    name: 'Joaquina',
    location: 'Florianópolis, SC',
    conditions: {
      size: '1.2m',
      sizeValue: 1.2,
      period: '9s',
      periodValue: 9,
      wind: 'SE',
      windSpeed: 10,
      windDirection: 'SE',
      swell: '1.3m',
      swellHeight: 1.3,
      weather: 'Parcialmente nublado',
      temperature: 23,
    },
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Praia Mole',
    location: 'Florianópolis, SC',
    conditions: {
      size: '1.4m',
      sizeValue: 1.4,
      period: '11s',
      periodValue: 11,
      wind: 'S',
      windSpeed: 8,
      windDirection: 'S',
      swell: '1.6m',
      swellHeight: 1.6,
      weather: 'Ensolarado',
      temperature: 25,
    },
    rating: 4.6,
  },
];

export function RecommendationsScreen({ navigation }: RecommendationsScreenProps) {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {t.greeting.hey}, {user.name}
          </Text>
          <Text style={styles.subtitle}>{t.recommendations.subtitle}</Text>
        </View>

        {/* Recommended Spots */}
        <View style={styles.spotsContainer}>
          {mockRecommendedSpots.map((spot) => (
            <SurfSpotCard
              key={spot.id}
              spot={spot}
              variant="full"
              showTopPick
              onPress={() => navigation.navigate('SpotDetails', { spotId: spot.id })}
            />
          ))}
        </View>

        {/* Conditions Summary */}
        <View style={styles.conditionsSection}>
          <Text style={styles.sectionTitle}>{t.home.conditionsToday}</Text>

          <View style={styles.conditionsGrid}>
            {/* Wave */}
            <View style={styles.conditionBox}>
              <View style={styles.conditionHeader}>
                <MaterialCommunityIcons
                  name="waves"
                  size={16}
                  color={colors.textMuted}
                />
                <Text style={styles.conditionLabel}>{t.conditions.wave}</Text>
              </View>
              <Text style={styles.conditionValue}>
                1.1 - 1.5m{' '}
                <Text style={styles.conditionDirection}>
                  <Ionicons name="caret-down" size={12} /> SSE
                </Text>
              </Text>
            </View>

            {/* Wind */}
            <View style={styles.conditionBox}>
              <View style={styles.conditionHeader}>
                <MaterialCommunityIcons
                  name="weather-windy"
                  size={16}
                  color={colors.textMuted}
                />
                <Text style={styles.conditionLabel}>{t.conditions.wind}</Text>
              </View>
              <Text style={styles.conditionValue}>
                12k/h{' '}
                <Text style={styles.conditionDirection}>
                  <Ionicons name="caret-up" size={12} /> S
                </Text>
              </Text>
            </View>

            {/* Period */}
            <View style={styles.conditionBox}>
              <View style={styles.conditionHeader}>
                <Ionicons
                  name="timer-outline"
                  size={16}
                  color={colors.textMuted}
                />
                <Text style={styles.conditionLabel}>{t.conditions.period}</Text>
              </View>
              <Text style={styles.conditionValue}>10s</Text>
            </View>

            {/* Weather */}
            <View style={styles.conditionBox}>
              <View style={styles.conditionHeader}>
                <Ionicons
                  name="sunny-outline"
                  size={16}
                  color={colors.textMuted}
                />
                <Text style={styles.conditionLabel}>{t.conditions.weather}</Text>
              </View>
              <Text style={styles.conditionValue}>
                24°C{' '}
                <Ionicons name="sunny" size={16} color={colors.accent} />
              </Text>
            </View>
          </View>
        </View>

        {/* View Map Button */}
        <View style={styles.mapButtonContainer}>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map-outline" size={18} color={colors.textPrimary} />
            <Text style={styles.mapButtonText}>{t.recommendations.viewMap}</Text>
          </TouchableOpacity>
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
  headerBar: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  backButton: {
    padding: spacing.sm,
    alignSelf: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  spotsContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  conditionsSection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  conditionBox: {
    width: '47%',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  conditionLabel: {
    ...typography.small,
    color: colors.textMuted,
    fontWeight: '600',
  },
  conditionValue: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  conditionDirection: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  mapButtonContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.round,
    gap: spacing.sm,
  },
  mapButtonText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
