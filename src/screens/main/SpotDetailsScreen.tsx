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
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { RootStackParamList } from '../../types';

type SpotDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SpotDetails'>;
  route: RouteProp<RootStackParamList, 'SpotDetails'>;
};

export function SpotDetailsScreen({ navigation, route }: SpotDetailsScreenProps) {
  const { spotId } = route.params;

  // Mock data - in real app, fetch based on spotId
  const spot = {
    id: spotId,
    name: 'Kirra Beach',
    location: 'Gold Coast, Australia',
    description:
      'World-class right-hand point break known for its long, hollow barrels. Best on south swells with light winds.',
    conditions: {
      size: '1.3m',
      period: '10s',
      wind: '12kph SSE',
      swell: '1.5m',
      weather: 'Sunny',
      temperature: 24,
      tide: 'Mid',
      waterTemp: 22,
    },
    forecast: [
      { time: '6AM', rating: 4, size: '1.1m' },
      { time: '9AM', rating: 5, size: '1.3m' },
      { time: '12PM', rating: 4, size: '1.2m' },
      { time: '3PM', rating: 3, size: '1.0m' },
      { time: '6PM', rating: 3, size: '0.9m' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{spot.name}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={colors.primary} />
          <Text style={styles.locationText}>{spot.location}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>{spot.description}</Text>
        </View>

        {/* Current Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CURRENT CONDITIONS</Text>
          <View style={styles.conditionsCard}>
            <View style={styles.conditionRow}>
              <View style={styles.conditionItem}>
                <MaterialCommunityIcons
                  name="wave"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.conditionLabel}>Wave Height</Text>
                <Text style={styles.conditionValue}>{spot.conditions.size}</Text>
              </View>
              <View style={styles.conditionItem}>
                <Ionicons
                  name="timer-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.conditionLabel}>Period</Text>
                <Text style={styles.conditionValue}>{spot.conditions.period}</Text>
              </View>
            </View>
            <View style={styles.conditionRow}>
              <View style={styles.conditionItem}>
                <MaterialCommunityIcons
                  name="weather-windy"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.conditionLabel}>Wind</Text>
                <Text style={styles.conditionValue}>{spot.conditions.wind}</Text>
              </View>
              <View style={styles.conditionItem}>
                <MaterialCommunityIcons
                  name="waves"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.conditionLabel}>Swell</Text>
                <Text style={styles.conditionValue}>{spot.conditions.swell}</Text>
              </View>
            </View>
            <View style={styles.conditionRow}>
              <View style={styles.conditionItem}>
                <Ionicons name="sunny-outline" size={20} color={colors.primary} />
                <Text style={styles.conditionLabel}>Weather</Text>
                <Text style={styles.conditionValue}>
                  {spot.conditions.temperature}°C
                </Text>
              </View>
              <View style={styles.conditionItem}>
                <Ionicons name="water-outline" size={20} color={colors.primary} />
                <Text style={styles.conditionLabel}>Water</Text>
                <Text style={styles.conditionValue}>
                  {spot.conditions.waterTemp}°C
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TODAY'S FORECAST</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastContainer}
          >
            {spot.forecast.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.forecastItem,
                  item.rating === 5 && styles.forecastItemBest,
                ]}
              >
                <Text style={styles.forecastTime}>{item.time}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < item.rating ? 'star' : 'star-outline'}
                      size={12}
                      color={i < item.rating ? colors.accent : colors.textMuted}
                    />
                  ))}
                </View>
                <Text style={styles.forecastSize}>{item.size}</Text>
              </View>
            ))}
          </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  favoriteButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  locationText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  conditionsCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  conditionRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  conditionItem: {
    flex: 1,
    alignItems: 'center',
  },
  conditionLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  conditionValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  forecastContainer: {
    paddingRight: spacing.lg,
  },
  forecastItem: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.sm,
    alignItems: 'center',
    minWidth: 70,
  },
  forecastItemBest: {
    backgroundColor: colors.cardBg,
  },
  forecastTime: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  forecastSize: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
