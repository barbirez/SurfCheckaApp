import { SurfSpot, SurfSession, ConsistencyStats, WeeklyActivity, Article, YouTubeVideo, SpotRating } from '../types';

// Unsplash surf images
export const BEACH_IMAGES = {
  surf1: 'https://images.unsplash.com/photo-1527731149372-fae504a1185f?w=800&q=80',
  surf2: 'https://images.unsplash.com/photo-1526342122811-2a9c8512023d?w=800&q=80',
  surf3: 'https://images.unsplash.com/photo-1584444363979-f54a9fa5409f?w=800&q=80',
  wave1: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
  wave2: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=800&q=80',
  beach1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  surfer1: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=800&q=80',
  surfer2: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&q=80',
};

// Mock surf spots with real images
export const mockSpots: SurfSpot[] = [
  {
    id: 'campeche',
    name: 'Campeche',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.surf1,
    rating: 'epic' as SpotRating,
    ratingValue: 5,
    isTopPick: true,
    distance: '2.3 km',
    difficultyLevel: 'all',
    description: 'Uma das praias mais consistentes de Florianópolis, com ondas de qualidade durante todo o ano. Ideal para surfistas de todos os níveis.',
    liveCamUrl: 'https://example.com/campeche-cam',
    latitude: -27.6833,
    longitude: -48.4833,
    conditions: {
      size: '1.1 - 1.5m',
      sizeValue: 1.3,
      period: '10s',
      periodValue: 10,
      wind: 'SSE',
      windSpeed: 12,
      windDirection: 'SSE',
      swell: '1.2m',
      swellHeight: 1.2,
      weather: 'Ensolarado',
      temperature: 24,
      tide: 'Média',
      waterTemp: 22,
      rating: 'epic' as SpotRating,
      ratingValue: 5,
    },
  },
  {
    id: 'joaquina',
    name: 'Joaquina',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.surf2,
    rating: 'great' as SpotRating,
    ratingValue: 4,
    distance: '5.1 km',
    difficultyLevel: 'intermediate',
    description: 'Praia famosa pelas dunas e ondas fortes. Sede de campeonatos internacionais de surf.',
    liveCamUrl: 'https://example.com/joaquina-cam',
    latitude: -27.6297,
    longitude: -48.4456,
    conditions: {
      size: '0.8 - 1.2m',
      sizeValue: 1.0,
      period: '8s',
      periodValue: 8,
      wind: 'NE',
      windSpeed: 15,
      windDirection: 'NE',
      swell: '1.0m',
      swellHeight: 1.0,
      weather: 'Parcialmente nublado',
      temperature: 23,
      tide: 'Baixa',
      waterTemp: 21,
      rating: 'great' as SpotRating,
      ratingValue: 4,
    },
  },
  {
    id: 'praia-mole',
    name: 'Praia Mole',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.surf3,
    rating: 'good' as SpotRating,
    ratingValue: 3,
    distance: '4.2 km',
    difficultyLevel: 'beginner',
    description: 'Praia com ondas menores e mais suaves, perfeita para iniciantes e longboarders.',
    liveCamUrl: 'https://example.com/praia-mole-cam',
    latitude: -27.6036,
    longitude: -48.4361,
    conditions: {
      size: '0.5 - 0.8m',
      sizeValue: 0.65,
      period: '6s',
      periodValue: 6,
      wind: 'E',
      windSpeed: 8,
      windDirection: 'E',
      swell: '0.6m',
      swellHeight: 0.6,
      weather: 'Ensolarado',
      temperature: 26,
      tide: 'Alta',
      waterTemp: 23,
      rating: 'good' as SpotRating,
      ratingValue: 3,
    },
  },
  {
    id: 'barra-lagoa',
    name: 'Barra da Lagoa',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.wave1,
    rating: 'fair' as SpotRating,
    ratingValue: 2,
    distance: '6.8 km',
    difficultyLevel: 'beginner',
    description: 'Vila de pescadores com ondas suaves e ambiente familiar.',
    conditions: {
      size: '0.3 - 0.5m',
      sizeValue: 0.4,
      period: '5s',
      periodValue: 5,
      wind: 'N',
      windSpeed: 5,
      windDirection: 'N',
      swell: '0.4m',
      swellHeight: 0.4,
      weather: 'Nublado',
      temperature: 22,
      tide: 'Média',
      waterTemp: 21,
      rating: 'fair' as SpotRating,
      ratingValue: 2,
    },
  },
  {
    id: 'morro-pedras',
    name: 'Morro das Pedras',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.wave2,
    rating: 'great' as SpotRating,
    ratingValue: 4,
    distance: '8.5 km',
    difficultyLevel: 'advanced',
    description: 'Ondas tubulares para surfistas experientes. Fundo de pedra requer cuidado.',
    conditions: {
      size: '1.5 - 2.0m',
      sizeValue: 1.75,
      period: '12s',
      periodValue: 12,
      wind: 'S',
      windSpeed: 10,
      windDirection: 'S',
      swell: '1.8m',
      swellHeight: 1.8,
      weather: 'Ensolarado',
      temperature: 25,
      tide: 'Baixa',
      waterTemp: 22,
      rating: 'great' as SpotRating,
      ratingValue: 4,
    },
  },
  {
    id: 'santinho',
    name: 'Santinho',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.beach1,
    rating: 'good' as SpotRating,
    ratingValue: 3,
    distance: '12.3 km',
    difficultyLevel: 'intermediate',
    description: 'Praia com inscrições rupestres e boas ondas para surfistas intermediários.',
    conditions: {
      size: '0.7 - 1.0m',
      sizeValue: 0.85,
      period: '7s',
      periodValue: 7,
      wind: 'NE',
      windSpeed: 12,
      windDirection: 'NE',
      swell: '0.9m',
      swellHeight: 0.9,
      weather: 'Parcialmente nublado',
      temperature: 24,
      tide: 'Alta',
      waterTemp: 22,
      rating: 'good' as SpotRating,
      ratingValue: 3,
    },
  },
  {
    id: 'matadeiro',
    name: 'Matadeiro',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.surfer1,
    rating: 'poor' as SpotRating,
    ratingValue: 1,
    distance: '15.0 km',
    difficultyLevel: 'all',
    description: 'Praia preservada com acesso por trilha. Ondas dependem muito do swell.',
    conditions: {
      size: '0.2 - 0.4m',
      sizeValue: 0.3,
      period: '4s',
      periodValue: 4,
      wind: 'W',
      windSpeed: 20,
      windDirection: 'W',
      swell: '0.3m',
      swellHeight: 0.3,
      weather: 'Ventando',
      temperature: 21,
      tide: 'Média',
      waterTemp: 20,
      rating: 'poor' as SpotRating,
      ratingValue: 1,
    },
  },
  {
    id: 'armacao',
    name: 'Armação',
    location: 'Florianópolis, SC',
    imageUrl: BEACH_IMAGES.surfer2,
    rating: 'fair' as SpotRating,
    ratingValue: 2,
    distance: '14.2 km',
    difficultyLevel: 'beginner',
    description: 'Praia tranquila com ondas pequenas, ideal para famílias e iniciantes.',
    conditions: {
      size: '0.4 - 0.6m',
      sizeValue: 0.5,
      period: '5s',
      periodValue: 5,
      wind: 'SE',
      windSpeed: 8,
      windDirection: 'SE',
      swell: '0.5m',
      swellHeight: 0.5,
      weather: 'Ensolarado',
      temperature: 25,
      tide: 'Baixa',
      waterTemp: 22,
      rating: 'fair' as SpotRating,
      ratingValue: 2,
    },
  },
];

// Mock sessions for tracking
export const mockSessions: SurfSession[] = [
  {
    id: '1',
    date: '2026-02-12',
    duration: 120,
    spotId: 'campeche',
    spotName: 'Campeche',
    spotImageUrl: BEACH_IMAGES.surf1,
    conditionRating: 5,
    surfRating: 5,
    notes: 'Sessão épica! Ondas perfeitas e pouco crowd.',
    createdAt: '2026-02-12T08:00:00Z',
  },
  {
    id: '2',
    date: '2026-02-10',
    duration: 90,
    spotId: 'joaquina',
    spotName: 'Joaquina',
    spotImageUrl: BEACH_IMAGES.surf2,
    conditionRating: 4,
    surfRating: 4,
    notes: 'Vento um pouco forte mas deu pra aproveitar.',
    createdAt: '2026-02-10T07:30:00Z',
  },
  {
    id: '3',
    date: '2026-02-08',
    duration: 60,
    spotId: 'praia-mole',
    spotName: 'Praia Mole',
    spotImageUrl: BEACH_IMAGES.surf3,
    conditionRating: 3,
    surfRating: 3,
    createdAt: '2026-02-08T16:00:00Z',
  },
  {
    id: '4',
    date: '2026-02-05',
    duration: 75,
    spotId: 'campeche',
    spotName: 'Campeche',
    spotImageUrl: BEACH_IMAGES.surf1,
    conditionRating: 4,
    surfRating: 4,
    notes: 'Dawn patrol, ondas limpas.',
    createdAt: '2026-02-05T06:00:00Z',
  },
  {
    id: '5',
    date: '2026-02-03',
    duration: 45,
    spotId: 'barra-lagoa',
    spotName: 'Barra da Lagoa',
    spotImageUrl: BEACH_IMAGES.wave1,
    conditionRating: 2,
    surfRating: 3,
    notes: 'Ondas pequenas mas divertidas.',
    createdAt: '2026-02-03T15:00:00Z',
  },
];

// Mock consistency stats
export const mockConsistencyStats: ConsistencyStats = {
  totalSessions: 47,
  totalHours: 94,
  sessionsThisMonth: 8,
  sessionsThisWeek: 3,
  averageSessionLength: 75,
  favoriteSpot: 'Campeche',
  lastSessionDate: '2026-02-12',
  weeklyGoal: 4,
  weeklyProgress: 3,
};

// Generate weekly activity for last 7 days
export function generateWeeklyActivity(sessions: SurfSession[]): WeeklyActivity[] {
  const today = new Date();
  const weeklyActivity: WeeklyActivity[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const daySessions = sessions.filter((s) => s.date === dateStr);

    weeklyActivity.push({
      date: dateStr,
      hasSurfed: daySessions.length > 0,
      sessions: daySessions,
    });
  }

  return weeklyActivity;
}

// Mock articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: '5 ajustes que destravam a evolução no surf',
    category: 'Evolução',
    imageUrl: BEACH_IMAGES.surfer1,
  },
  {
    id: '2',
    title: 'Como ler as condições do mar',
    category: 'Fundamentos',
    imageUrl: BEACH_IMAGES.wave1,
  },
  {
    id: '3',
    title: 'Equipamento: escolhendo a prancha certa',
    category: 'Equipamento',
    imageUrl: BEACH_IMAGES.surf2,
  },
  {
    id: '4',
    title: 'Segurança no mar: o que você precisa saber',
    category: 'Segurança',
    imageUrl: BEACH_IMAGES.beach1,
  },
  {
    id: '5',
    title: 'Alongamentos essenciais para surfistas',
    category: 'Saúde',
    imageUrl: BEACH_IMAGES.surfer2,
  },
];

// Mock YouTube videos
export const mockYouTubeVideos: YouTubeVideo[] = [
  {
    id: '1',
    title: 'Como fazer o drop corretamente',
    thumbnailUrl: BEACH_IMAGES.surfer1,
    videoUrl: 'https://youtube.com/watch?v=example1',
    duration: '8:45',
  },
  {
    id: '2',
    title: 'Técnica de remada eficiente',
    thumbnailUrl: BEACH_IMAGES.surf2,
    videoUrl: 'https://youtube.com/watch?v=example2',
    duration: '12:30',
  },
  {
    id: '3',
    title: 'Bottom turn: passo a passo',
    thumbnailUrl: BEACH_IMAGES.wave2,
    videoUrl: 'https://youtube.com/watch?v=example3',
    duration: '10:15',
  },
];

// Helper function to get spot by ID
export function getSpotById(spotId: string): SurfSpot | undefined {
  return mockSpots.find((spot) => spot.id === spotId);
}

// Helper function to get nearby spots
export function getNearbySpots(limit: number = 3): SurfSpot[] {
  return [...mockSpots]
    .sort((a, b) => {
      const distA = parseFloat(a.distance?.replace(' km', '') || '999');
      const distB = parseFloat(b.distance?.replace(' km', '') || '999');
      return distA - distB;
    })
    .slice(0, limit);
}

// Helper function to get top rated spots
export function getTopRatedSpots(limit: number = 3): SurfSpot[] {
  return [...mockSpots]
    .sort((a, b) => b.ratingValue - a.ratingValue)
    .slice(0, limit);
}
