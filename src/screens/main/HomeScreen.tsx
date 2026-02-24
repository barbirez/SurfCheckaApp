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
  SurfSpotCard,
  SearchCard,
  VisualConditions,
  ArticleCard,
  YouTubeCard,
} from '../../components';
import { useUser } from '../../context/UserContext';
import { RootStackParamList, SurfSpot, Article, YouTubeVideo, SurfConditions, SpotRating } from '../../types';
import { BEACH_IMAGES } from '../../data/mockData';
import { t } from '../../i18n';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Mock current conditions
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
  tide: 'Média',
  waterTemp: 22,
};

// Mock surf spots
const mockSurfSpots: SurfSpot[] = [
  {
    id: '1',
    name: 'Campeche',
    location: 'Florianópolis, SC',
    conditions: mockConditions,
    rating: 'epic' as SpotRating,
    ratingValue: 5,
    imageUrl: BEACH_IMAGES.surf1,
  },
  {
    id: '2',
    name: 'Joaquina',
    location: 'Florianópolis, SC',
    conditions: mockConditions,
    rating: 'great' as SpotRating,
    ratingValue: 4,
    imageUrl: BEACH_IMAGES.surf2,
  },
  {
    id: '3',
    name: 'Praia Mole',
    location: 'Florianópolis, SC',
    conditions: mockConditions,
    rating: 'good' as SpotRating,
    ratingValue: 3,
    imageUrl: BEACH_IMAGES.surf3,
  },
  {
    id: '4',
    name: 'Barra da Lagoa',
    location: 'Florianópolis, SC',
    conditions: mockConditions,
    rating: 'fair' as SpotRating,
    ratingValue: 2,
    imageUrl: BEACH_IMAGES.wave1,
  },
];

// Articles from translations
const articles: Article[] = t.articles;

// Mock YouTube videos
const mockYouTubeVideos: YouTubeVideo[] = [
  {
    id: '1',
    title: 'Como melhorar sua remada no surf',
    thumbnailUrl: '',
    videoUrl: 'https://youtube.com/@finfunsurf',
    duration: '8:24',
  },
  {
    id: '2',
    title: 'Técnicas de drop para iniciantes',
    thumbnailUrl: '',
    videoUrl: 'https://youtube.com/@finfunsurf',
    duration: '12:15',
  },
  {
    id: '3',
    title: 'Leitura de ondas: guia completo',
    thumbnailUrl: '',
    videoUrl: 'https://youtube.com/@finfunsurf',
    duration: '15:42',
  },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { user } = useUser();

  const handleSurfcheck = () => {
    navigation.navigate('Surfcheck');
  };

  const handleBeachList = () => {
    navigation.navigate('BeachList');
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
            {t.greeting.hey}, {user.name}!
          </Text>
        </View>

        {/* Feature Card - Surfcheck Mate */}
        <FeatureCard
          title={t.home.surfcheckMate.title}
          description={t.home.surfcheckMate.description}
          buttonText={t.home.surfcheckMate.button}
          onPress={handleSurfcheck}
        />

        {/* Visual Conditions */}
        <VisualConditions conditions={mockConditions} />

        {/* Surf Spots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.home.surfSpots}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.spotsScrollView}
            contentContainerStyle={styles.spotsContent}
          >
            <SearchCard onPress={handleBeachList} />
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
          <Text style={styles.sectionTitle}>{t.home.learnFollow}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.articlesContent}
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </ScrollView>
        </View>

        {/* YouTube Videos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.home.watchYoutube}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.youtubeContent}
          >
            {mockYouTubeVideos.map((video) => (
              <YouTubeCard key={video.id} video={video} />
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  greeting: {
    ...typography.pageTitle,
    color: colors.textPrimary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  spotsScrollView: {
    marginLeft: 0,
  },
  spotsContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
  },
  articlesContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
  },
  youtubeContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
