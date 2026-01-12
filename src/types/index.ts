export type SurfExperience = 'less_than_year' | '1_2_years' | '3_5_years' | '5_plus_years';

export type SurfLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  experience: SurfExperience | null;
  level: SurfLevel | null;
  onboardingComplete: boolean;
  favoriteSpots: string[];
}

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
}

export interface SurfSpot {
  id: string;
  name: string;
  location: string;
  conditions: SurfConditions;
  rating: number;
  isTopPick?: boolean;
  distance?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  liveCamUrl?: string;
  description?: string;
}

export interface TimeSlot {
  time: string;
  label: string;
  conditions: SurfConditions;
}

// Surf Tracker types
export interface SurfSession {
  id: string;
  date: string;
  duration: number; // in minutes
  spotId: string;
  spotName: string;
  conditionRating: number; // 1-5 stars
  surfRating: number; // 1-5 stars
  notes?: string;
}

export interface SurfStreak {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalHours: number;
  thisMonthSessions: number;
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
  Home: undefined;
  Surfcheck: undefined;
  Recommendations: undefined;
  SpotDetails: { spotId: string };
  BeachList: undefined;
  CheckIn: { spotId?: string };
  EditProfile: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Experience: undefined;
  Level: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Surfcheck: undefined;
  Tracker: undefined;
  Favorites: undefined;
  Profile: undefined;
};
