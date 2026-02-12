// User types
export type SurfExperience = 'less_than_year' | '1_2_years' | '3_5_years' | '5_plus_years';
export type SurfLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  experience: SurfExperience | null;
  level: SurfLevel | null;
  onboardingComplete: boolean;
  favoriteSpots: string[];
}

// Rating system (Poor to Epic)
export type SpotRating = 'poor' | 'fair' | 'good' | 'great' | 'epic';

export const RATING_VALUES: Record<SpotRating, number> = {
  poor: 1,
  fair: 2,
  good: 3,
  great: 4,
  epic: 5,
};

export const RATING_LABELS: Record<SpotRating, string> = {
  poor: 'Ruim',
  fair: 'Razoável',
  good: 'Bom',
  great: 'Ótimo',
  epic: 'Épico',
};

export const RATING_COLORS: Record<SpotRating, string> = {
  poor: '#FF453A',
  fair: '#FF9F0A',
  good: '#FFD60A',
  great: '#30D158',
  epic: '#5E5CE6',
};

// Surf conditions
export interface SurfConditions {
  size: string;
  sizeValue: number;
  period: string;
  periodValue: number;
  wind: string;
  windSpeed: number;
  windDirection: string;
  swell: string;
  swellHeight: number;
  weather: string;
  temperature: number;
  tide?: string;
  waterTemp?: number;
  rating?: SpotRating;
  ratingValue?: number;
}

// Surf spot
export interface SurfSpot {
  id: string;
  name: string;
  location: string;
  conditions: SurfConditions;
  rating: SpotRating;
  ratingValue: number;
  isTopPick?: boolean;
  distance?: string;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
  liveCamUrl?: string;
  description?: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all';
}

export interface TimeSlot {
  time: string;
  label: string;
  conditions: SurfConditions;
}

// Forecast data for charts
export interface ForecastData {
  time: string;
  date: string;
  waveHeight: number;
  wavePeriod: number;
  windSpeed: number;
  windDirection: string;
  swellHeight: number;
  swellDirection: string;
  tideHeight: number;
  tideState: 'rising' | 'falling' | 'high' | 'low';
}

// Surf session (for tracking)
export interface SurfSession {
  id: string;
  date: string;
  duration: number;
  spotId: string;
  spotName: string;
  spotImageUrl?: string;
  conditionRating: number;
  surfRating: number;
  notes?: string;
  createdAt?: string;
}

// Consistency stats (replacing streak focus)
export interface ConsistencyStats {
  totalSessions: number;
  totalHours: number;
  sessionsThisMonth: number;
  sessionsThisWeek: number;
  averageSessionLength: number;
  favoriteSpot?: string;
  lastSessionDate?: string;
  weeklyGoal?: number;
  weeklyProgress?: number;
}

// Weekly activity for Track screen
export interface WeeklyActivity {
  date: string;
  hasSurfed: boolean;
  sessions: SurfSession[];
}

// Magic Finder types
export interface MagicFinderResult {
  bestPick: SurfSpot;
  alternatives: SurfSpot[];
  conditionsSummary: ConditionsSummary;
  reasoning?: string;
}

export interface ConditionsSummary {
  waveRange: string;
  windCondition: string;
  period: string;
  weather: string;
  temperature: number;
  bestTimeOfDay?: string;
}

// Article type for Learn & Follow
export interface Article {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  url?: string;
}

// YouTube video type
export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration?: string;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  OnboardingWelcome: undefined;
  OnboardingExperience: undefined;
  OnboardingLevel: undefined;
  Main: undefined;
  MagicFinder: undefined;
  MagicFinderResults: { results: MagicFinderResult };
  SpotDetails: { spotId: string };
  CheckIn: { spotId?: string };
  EditProfile: undefined;
  Settings: undefined;
  SessionHistory: undefined;
  CalendarView: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Experience: undefined;
  Level: undefined;
};

export type MainTabParamList = {
  Search: undefined;
  Conditions: undefined;
  Track: undefined;
  Profile: undefined;
};
