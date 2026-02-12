import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { RootStackParamList, MagicFinderResult } from '../../types';
import { BestPickCard, SmallSpotCard } from '../../components/cards';
import { RatingDots } from '../../components/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type MagicFinderResultsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'MagicFinderResults'>;
};

export function MagicFinderResultsScreen({
  navigation,
  route,
}: MagicFinderResultsScreenProps) {
  const { results } = route.params;
  const { bestPick, alternatives, conditionsSummary } = results;

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSpotPress = (spotId: string) => {
    navigation.navigate('SpotDetails', { spotId });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Magic Finder</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Animated.View
          style={[
            styles.greetingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.greeting}>E aí, surfista!</Text>
          <Text style={styles.subGreeting}>
            Recomendamos esses picos pra você...
          </Text>
        </Animated.View>

        {/* Best Pick */}
        <Animated.View
          style={[
            styles.bestPickContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <BestPickCard
            spot={bestPick}
            onPress={() => handleSpotPress(bestPick.id)}
          />
        </Animated.View>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <Animated.View
            style={[
              styles.alternativesContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.alternativesRow}>
              {alternatives.slice(0, 2).map((spot) => (
                <SmallSpotCard
                  key={spot.id}
                  spot={spot}
                  onPress={() => handleSpotPress(spot.id)}
                />
              ))}
            </View>
          </Animated.View>
        )}

        {/* Conditions Summary */}
        <Animated.View
          style={[
            styles.conditionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>CONDIÇÕES ATUAIS</Text>
          <View style={[styles.conditionsCard, shadows.sm]}>
            {/* Rating */}
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>RATING</Text>
              <RatingDots rating={bestPick.rating} size="lg" />
            </View>

            {/* Conditions Grid */}
            <View style={styles.conditionsGrid}>
              <View style={styles.conditionItem}>
                <MaterialCommunityIcons name="waves" size={24} color={colors.primary} />
                <Text style={styles.conditionLabel}>ONDA</Text>
                <Text style={styles.conditionValue}>{conditionsSummary.waveRange}</Text>
              </View>
              <View style={styles.conditionItem}>
                <MaterialCommunityIcons name="weather-windy" size={24} color={colors.primary} />
                <Text style={styles.conditionLabel}>VENTO</Text>
                <Text style={styles.conditionValue}>{conditionsSummary.windCondition}</Text>
              </View>
              <View style={styles.conditionItem}>
                <Ionicons name="timer-outline" size={24} color={colors.primary} />
                <Text style={styles.conditionLabel}>PERÍODO</Text>
                <Text style={styles.conditionValue}>{conditionsSummary.period}</Text>
              </View>
              <View style={styles.conditionItem}>
                <Ionicons name="sunny-outline" size={24} color={colors.accent} />
                <Text style={styles.conditionLabel}>CLIMA</Text>
                <Text style={styles.conditionValue}>{conditionsSummary.temperature}°C</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Try Again Button */}
        <View style={styles.tryAgainContainer}>
          <TouchableOpacity
            style={styles.tryAgainButton}
            onPress={handleBack}
          >
            <Ionicons name="refresh" size={20} color={colors.primary} />
            <Text style={styles.tryAgainText}>Buscar Novamente</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  greetingContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  subGreeting: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  bestPickContainer: {
    paddingHorizontal: spacing.lg,
  },
  alternativesContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  alternativesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  conditionsContainer: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  conditionsCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  ratingSection: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundDark,
    marginBottom: spacing.lg,
  },
  ratingLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  conditionItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  conditionLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  conditionValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  tryAgainContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  tryAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  tryAgainText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
