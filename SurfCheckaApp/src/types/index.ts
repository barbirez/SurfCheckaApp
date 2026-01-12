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
}

export interface SurfSpot {
  id: string;
  name: string;
  location: string;
  conditions: SurfConditions;
  rating: number;
  isTopPick?: boolean;
  distance?: string;
}

export interface TimeSlot {
  time: string;
  label: string;
  conditions: SurfConditions;
}

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
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Experience: undefined;
  Level: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Surfcheck: undefined;
  Favorites: undefined;
  Profile: undefined;
};
