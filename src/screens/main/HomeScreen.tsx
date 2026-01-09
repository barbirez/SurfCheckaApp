import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../theme';
import {
  FeatureCard,
  ConditionsCard,
  SurfSpotCard,
  SearchCard,
} from '../../components';
import { useUser } from '../../context/UserContext';
import { RootStackParamList, TimeSlot, SurfSpot } from '../../types';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Mock data for conditions
const mockTimeSlots: TimeSlot[] = [
  {
    time: '14:00',
    label: 'NOW 2PM',
    conditions: {
      size: '0.9m',
      sizeValue: 0.9,
      period: '7s',
      periodValue: 7,
      wind: 'ESE',
      windSpeed: 4,
      windDirection: 'ESE',
      swell: '0.5m',
      swellHeight: 1.1,
      weather: 'Sunny',
      temperature: 24,
    },
  },
  {
    time: '17:00',
    label: '5PM',
    conditions: {
      size: '1.0m',
      sizeValue: 1.0,
      period: '8s',
      periodValue: 8,
      wind: 'E',
      windSpeed: 6,
      windDirection: 'E',
      swell: '0.6m',
      swellHeight: 1.2,
      weather: 'Partly Cloudy',
      temperature: 22,
    },
  },
];

// Mock surf spots
const mockSurfSpots: SurfSpot[] = [
  {
    id: '1',
    name: 'Campeche',
    location: 'Florianópolis, Brazil',
    conditions: mockTimeSlots[0].conditions,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Campeche Sul',
    location: 'Florianópolis, Brazil',
    conditions: mockTimeSlots[0].conditions,
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Mole',
    location: 'Florianópolis, Brazil',
    conditions: mockTimeSlots[0].conditions,
    rating: 4.0,
  },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { user } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleSurfcheck = () => {
    navigation.navigate('Surfcheck');
  };

  const handleSpotPress = (spotId: string) => {
    navigation.navigate('SpotDetails', { spotId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {getGreeting()}, {user.name}!
          </Text>
        </View>

        {/* Feature Card - Surfcheck Mate */}
        <FeatureCard
          title="Surfcheck Mate"
          description="Find the best beach break to go surfing. Anytime!"
          buttonText="Try Now"
          onPress={handleSurfcheck}
        />

        {/* Conditions Today */}
        <ConditionsCard timeSlots={mockTimeSlots} activeSlot={0} />

        {/* Surf Spots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SURF SPOTS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.spotsScrollView}
            contentContainerStyle={styles.spotsContent}
          >
            <SearchCard onPress={handleSurfcheck} />
            {mockSurfSpots.map((spot) => (
              <SurfSpotCard
                key={spot.id}
                spot={spot}
                onPress={() => handleSpotPress(spot.id)}
                variant="compact"
              />
            ))}
          </ScrollView>
        </View>

        {/* Learn & Follow */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEARN & FOLLOW</Text>
          <View style={styles.learnCards}>
            <View style={styles.learnCard} />
            <View style={styles.learnCard} />
          </View>
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
    paddingBottom: spacing.lg,
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
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
  spotsScrollView: {
    marginLeft: 0,
  },
  spotsContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
  },
  learnCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  learnCard: {
    flex: 1,
    height: 100,
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});
