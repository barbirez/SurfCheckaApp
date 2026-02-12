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
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { RootStackParamList } from '../../types';
import { SpotCardWithImage } from '../../components/cards';
import { mockSpots, getNearbySpots } from '../../data/mockData';
import { t } from '../../i18n';

type SearchScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const nearbySpots = getNearbySpots(3);
  const filteredSpots = searchQuery
    ? mockSpots.filter((spot) =>
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockSpots;

  const handleSpotPress = (spotId: string) => {
    navigation.navigate('SpotDetails', { spotId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Picos de Surf</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, shadows.sm]}>
            <Ionicons name="search" size={20} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar pico..."
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

        {/* Near You Section */}
        {!searchQuery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PERTO DE VOCÊ</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {nearbySpots.map((spot) => (
                <View key={spot.id} style={styles.compactCardWrapper}>
                  <SpotCardWithImage
                    spot={spot}
                    variant="compact"
                    onPress={() => handleSpotPress(spot.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Spots / Search Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `RESULTADOS (${filteredSpots.length})` : 'TODOS OS PICOS'}
          </Text>
          <View style={styles.spotsList}>
            {filteredSpots.map((spot) => (
              <SpotCardWithImage
                key={spot.id}
                spot={spot}
                variant="full"
                onPress={() => handleSpotPress(spot.id)}
              />
            ))}
          </View>
          {filteredSpots.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>Nenhum pico encontrado</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  compactCardWrapper: {
    marginRight: spacing.md,
  },
  spotsList: {
    paddingHorizontal: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
