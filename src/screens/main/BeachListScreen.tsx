import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ImagePlaceholder } from '../../components';
import { RootStackParamList, SurfSpot, SurfConditions } from '../../types';
import { t } from '../../i18n';

type BeachListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BeachList'>;
};

const mockConditions: SurfConditions = {
  size: '0.9m',
  sizeValue: 0.9,
  period: '7s',
  periodValue: 7,
  wind: 'ESE',
  windSpeed: 4,
  windDirection: 'ESE',
  swell: '0.5m',
  swellHeight: 1.1,
  weather: 'Ensolarado',
  temperature: 24,
};

const allBeaches: SurfSpot[] = [
  { id: '1', name: 'Campeche', location: 'Florianópolis, SC', conditions: mockConditions, rating: 4.5, distance: '2.3 km' },
  { id: '2', name: 'Joaquina', location: 'Florianópolis, SC', conditions: mockConditions, rating: 4.2, distance: '5.1 km' },
  { id: '3', name: 'Praia Mole', location: 'Florianópolis, SC', conditions: mockConditions, rating: 4.0, distance: '4.8 km' },
  { id: '4', name: 'Barra da Lagoa', location: 'Florianópolis, SC', conditions: mockConditions, rating: 3.8, distance: '6.2 km' },
  { id: '5', name: 'Santinho', location: 'Florianópolis, SC', conditions: mockConditions, rating: 4.1, distance: '12.5 km' },
  { id: '6', name: 'Moçambique', location: 'Florianópolis, SC', conditions: mockConditions, rating: 4.3, distance: '8.7 km' },
  { id: '7', name: 'Lagoinha do Leste', location: 'Florianópolis, SC', conditions: mockConditions, rating: 4.6, distance: '15.3 km' },
  { id: '8', name: 'Matadeiro', location: 'Florianópolis, SC', conditions: mockConditions, rating: 4.4, distance: '14.1 km' },
];

function BeachCard({ beach, onPress }: { beach: SurfSpot; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.beachCard} onPress={onPress} activeOpacity={0.8}>
      <ImagePlaceholder width={80} height={80} variant="beach" style={styles.beachImage} />
      <View style={styles.beachInfo}>
        <Text style={styles.beachName}>{beach.name}</Text>
        <Text style={styles.beachLocation}>{beach.location}</Text>
        <View style={styles.beachMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.accent} />
            <Text style={styles.rating}>{beach.rating}</Text>
          </View>
          {beach.distance && (
            <View style={styles.distanceContainer}>
              <Ionicons name="location-outline" size={14} color={colors.textMuted} />
              <Text style={styles.distance}>{beach.distance}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.conditionBadge}>
        <Text style={styles.conditionText}>{beach.conditions.size}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function BeachListScreen({ navigation }: BeachListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBeaches = allBeaches.filter((beach) =>
    beach.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nearbyBeaches = filteredBeaches.slice(0, 3);
  const otherBeaches = filteredBeaches.slice(3);

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
        <Text style={styles.headerTitle}>{t.beachList.title}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t.beachList.searchPlaceholder}
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Nearby Beaches */}
        {nearbyBeaches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.beachList.nearYou}</Text>
            {nearbyBeaches.map((beach) => (
              <BeachCard
                key={beach.id}
                beach={beach}
                onPress={() => navigation.navigate('SpotDetails', { spotId: beach.id })}
              />
            ))}
          </View>
        )}

        {/* All Beaches */}
        {otherBeaches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.beachList.allBeaches}</Text>
            {otherBeaches.map((beach) => (
              <BeachCard
                key={beach.id}
                beach={beach}
                onPress={() => navigation.navigate('SpotDetails', { spotId: beach.id })}
              />
            ))}
          </View>
        )}

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
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  beachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  beachImage: {
    borderRadius: borderRadius.sm,
  },
  beachInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  beachName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  beachLocation: {
    ...typography.small,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  beachMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    ...typography.small,
    color: colors.textMuted,
  },
  conditionBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  conditionText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
