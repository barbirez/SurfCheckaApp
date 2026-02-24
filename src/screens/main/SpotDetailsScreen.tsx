import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ImagePlaceholder } from '../../components';
import { IconActionButton } from '../../components/ui';
import { RootStackParamList } from '../../types';
import { t } from '../../i18n';

type SpotDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SpotDetails'>;
  route: RouteProp<RootStackParamList, 'SpotDetails'>;
};

// Mock beach data
const beachData: Record<string, any> = {
  '1': {
    name: 'Campeche',
    location: 'Florianópolis, SC',
    description: 'Uma das praias mais consistentes de Floripa, com ondas de qualidade o ano todo. Funciona bem com ondulação de sul e sudeste. Ideal para surfistas de todos os níveis.',
    liveCamUrl: 'https://example.com/campeche-cam',
  },
  '2': {
    name: 'Joaquina',
    location: 'Florianópolis, SC',
    description: 'Famosa por sediar campeonatos de surf, a Joaquina oferece ondas potentes e tubulares. Melhor com ondulação de leste e ventos de oeste.',
    liveCamUrl: 'https://example.com/joaquina-cam',
  },
  '3': {
    name: 'Praia Mole',
    location: 'Florianópolis, SC',
    description: 'Praia com boas ondas e ambiente jovem. Funciona bem com ondulação de sul e sudeste. Boa opção para intermediários.',
    liveCamUrl: 'https://example.com/mole-cam',
  },
};

export function SpotDetailsScreen({ navigation, route }: SpotDetailsScreenProps) {
  const { spotId } = route.params;

  const beachInfo = beachData[spotId] || beachData['1'];

  const spot = {
    id: spotId,
    name: beachInfo.name,
    location: beachInfo.location,
    description: beachInfo.description,
    liveCamUrl: beachInfo.liveCamUrl,
    conditions: {
      size: '1.3m',
      period: '10s',
      wind: '12kph SSE',
      swell: '1.5m',
      weather: 'Ensolarado',
      temperature: 24,
      tide: 'Média',
      waterTemp: 22,
    },
    forecast: [
      { time: '6h', rating: 4, size: '1.1m' },
      { time: '9h', rating: 5, size: '1.3m' },
      { time: '12h', rating: 4, size: '1.2m' },
      { time: '15h', rating: 3, size: '1.0m' },
      { time: '18h', rating: 3, size: '0.9m' },
    ],
  };

  const handleLiveCamera = () => {
    if (spot.liveCamUrl) {
      Linking.openURL(spot.liveCamUrl);
    }
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
        {/* Beach Image */}
        <View style={styles.imageContainer}>
          <ImagePlaceholder
            width="100%"
            height={200}
            variant="beach"
            style={styles.beachImage}
          />
          {/* Live Camera Button */}
          <TouchableOpacity style={styles.liveCamButton} onPress={handleLiveCamera}>
            <Ionicons name="videocam" size={18} color={colors.textPrimary} />
            <Text style={styles.liveCamText}>{t.beachDetails.liveCameras}</Text>
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={colors.primary} />
          <Text style={styles.locationText}>{spot.location}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.beachDetails.about}</Text>
          <Text style={styles.description}>{spot.description}</Text>
        </View>

        {/* Current Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.beachDetails.currentConditions}</Text>
          <View style={styles.conditionsCard}>
            <View style={styles.conditionRow}>
              <View style={styles.conditionItem}>
                <MaterialCommunityIcons
                  name="wave"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.conditionLabel}>{t.conditions.wave}</Text>
                <Text style={styles.conditionValue}>{spot.conditions.size}</Text>
              </View>
              <View style={styles.conditionItem}>
                <Ionicons
                  name="timer-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.conditionLabel}>{t.conditions.period}</Text>
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
                <Text style={styles.conditionLabel}>{t.conditions.wind}</Text>
                <Text style={styles.conditionValue}>{spot.conditions.wind}</Text>
              </View>
              <View style={styles.conditionItem}>
                <MaterialCommunityIcons
                  name="waves"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.conditionLabel}>{t.conditions.swell}</Text>
                <Text style={styles.conditionValue}>{spot.conditions.swell}</Text>
              </View>
            </View>
            <View style={styles.conditionRow}>
              <View style={styles.conditionItem}>
                <Ionicons name="sunny-outline" size={20} color={colors.primary} />
                <Text style={styles.conditionLabel}>{t.conditions.weather}</Text>
                <Text style={styles.conditionValue}>
                  {spot.conditions.temperature}°C
                </Text>
              </View>
              <View style={styles.conditionItem}>
                <Ionicons name="water-outline" size={20} color={colors.primary} />
                <Text style={styles.conditionLabel}>{t.conditions.waterTemp}</Text>
                <Text style={styles.conditionValue}>
                  {spot.conditions.waterTemp}°C
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.beachDetails.todayForecast}</Text>
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

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <IconActionButton
            icon="add-circle-outline"
            label={t.surfTracker.logSession}
            onPress={() => navigation.navigate('CheckIn', { spotId })}
          />
          <IconActionButton
            icon="videocam-outline"
            label={t.beachDetails.liveCameras}
            onPress={handleLiveCamera}
          />
          <IconActionButton
            icon="share-outline"
            label="Compartilhar"
            onPress={() => {}}
          />
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
  imageContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    position: 'relative',
  },
  beachImage: {
    borderRadius: borderRadius.lg,
  },
  liveCamButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    gap: spacing.xs,
  },
  liveCamText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '600',
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
    ...typography.sectionHeader,
    color: colors.textMuted,
    marginBottom: spacing.sm,
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
