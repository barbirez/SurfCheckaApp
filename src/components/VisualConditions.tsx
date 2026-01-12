import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path, Line, Text as SvgText } from 'react-native-svg';
import { colors, spacing, borderRadius, typography } from '../theme';
import { SurfConditions } from '../types';
import { t } from '../i18n';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface VisualConditionsProps {
  conditions: SurfConditions;
}

// Wave height visualization
function WaveVisual({ height, label }: { height: number; label: string }) {
  const maxHeight = 60;
  const waveHeight = Math.min((height / 3) * maxHeight, maxHeight);

  return (
    <View style={styles.visualItem}>
      <View style={styles.visualHeader}>
        <MaterialCommunityIcons name="wave" size={18} color={colors.primary} />
        <Text style={styles.visualLabel}>{t.conditions.wave}</Text>
      </View>
      <View style={styles.waveContainer}>
        <Svg width="100%" height={70} viewBox="0 0 100 70">
          {/* Wave shape */}
          <Path
            d={`M0,${70 - waveHeight} Q25,${70 - waveHeight - 15} 50,${70 - waveHeight} T100,${70 - waveHeight} L100,70 L0,70 Z`}
            fill={colors.primary}
            opacity={0.3}
          />
          <Path
            d={`M0,${70 - waveHeight + 10} Q25,${70 - waveHeight - 5} 50,${70 - waveHeight + 10} T100,${70 - waveHeight + 10}`}
            fill="none"
            stroke={colors.primary}
            strokeWidth={2}
          />
        </Svg>
      </View>
      <Text style={styles.visualValue}>{label}</Text>
    </View>
  );
}

// Wind direction compass
function WindCompass({ direction, speed }: { direction: string; speed: number }) {
  const getRotation = (dir: string): number => {
    const directions: { [key: string]: number } = {
      'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
      'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
      'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
      'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5,
    };
    return directions[dir] || 0;
  };

  const rotation = getRotation(direction);

  return (
    <View style={styles.visualItem}>
      <View style={styles.visualHeader}>
        <MaterialCommunityIcons name="weather-windy" size={18} color={colors.primary} />
        <Text style={styles.visualLabel}>{t.conditions.wind}</Text>
      </View>
      <View style={styles.compassContainer}>
        <Svg width={80} height={80} viewBox="0 0 80 80">
          {/* Compass circle */}
          <Circle cx={40} cy={40} r={35} fill="none" stroke={colors.backgroundCard} strokeWidth={2} />
          <Circle cx={40} cy={40} r={28} fill="none" stroke={colors.backgroundCard} strokeWidth={1} />

          {/* Cardinal directions */}
          <SvgText x={40} y={12} fill={colors.textMuted} fontSize={10} textAnchor="middle">N</SvgText>
          <SvgText x={68} y={44} fill={colors.textMuted} fontSize={10} textAnchor="middle">E</SvgText>
          <SvgText x={40} y={76} fill={colors.textMuted} fontSize={10} textAnchor="middle">S</SvgText>
          <SvgText x={12} y={44} fill={colors.textMuted} fontSize={10} textAnchor="middle">W</SvgText>

          {/* Arrow */}
          <Path
            d={`M40,15 L45,40 L40,35 L35,40 Z`}
            fill={colors.primary}
            transform={`rotate(${rotation}, 40, 40)`}
          />
        </Svg>
      </View>
      <Text style={styles.visualValue}>{speed}kph {direction}</Text>
    </View>
  );
}

// Period visualization (circular gauge)
function PeriodGauge({ period }: { period: number }) {
  const maxPeriod = 20;
  const percentage = Math.min(period / maxPeriod, 1);
  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <View style={styles.visualItem}>
      <View style={styles.visualHeader}>
        <Ionicons name="timer-outline" size={18} color={colors.primary} />
        <Text style={styles.visualLabel}>{t.conditions.period}</Text>
      </View>
      <View style={styles.gaugeContainer}>
        <Svg width={80} height={80} viewBox="0 0 80 80">
          {/* Background circle */}
          <Circle
            cx={40}
            cy={40}
            r={30}
            fill="none"
            stroke={colors.backgroundCard}
            strokeWidth={6}
          />
          {/* Progress circle */}
          <Circle
            cx={40}
            cy={40}
            r={30}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90, 40, 40)"
          />
          {/* Center text */}
          <SvgText
            x={40}
            y={45}
            fill={colors.textPrimary}
            fontSize={16}
            fontWeight="bold"
            textAnchor="middle"
          >
            {period}s
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}

// Swell visualization
function SwellVisual({ height, direction }: { height: number; direction: string }) {
  return (
    <View style={styles.visualItem}>
      <View style={styles.visualHeader}>
        <MaterialCommunityIcons name="waves" size={18} color={colors.primary} />
        <Text style={styles.visualLabel}>{t.conditions.swell}</Text>
      </View>
      <View style={styles.swellContainer}>
        <Svg width="100%" height={50} viewBox="0 0 100 50">
          {/* Multiple wave lines */}
          {[0, 1, 2].map((i) => (
            <Path
              key={i}
              d={`M0,${25 + i * 8} Q15,${15 + i * 8} 30,${25 + i * 8} T60,${25 + i * 8} T90,${25 + i * 8} T120,${25 + i * 8}`}
              fill="none"
              stroke={colors.primary}
              strokeWidth={2}
              opacity={1 - i * 0.3}
            />
          ))}
        </Svg>
      </View>
      <Text style={styles.visualValue}>{height}m {direction}</Text>
    </View>
  );
}

export function VisualConditions({ conditions }: VisualConditionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.home.conditionsToday}</Text>
      <View style={styles.grid}>
        <WaveVisual height={conditions.sizeValue} label={conditions.size} />
        <WindCompass direction={conditions.windDirection} speed={conditions.windSpeed} />
        <PeriodGauge period={conditions.periodValue} />
        <SwellVisual height={conditions.swellHeight} direction={conditions.windDirection} />
      </View>

      {/* Additional info row */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="sunny-outline" size={20} color={colors.accent} />
          <Text style={styles.infoValue}>{conditions.temperature}°C</Text>
          <Text style={styles.infoLabel}>{t.conditions.weather}</Text>
        </View>
        {conditions.waterTemp && (
          <View style={styles.infoItem}>
            <Ionicons name="water-outline" size={20} color={colors.primary} />
            <Text style={styles.infoValue}>{conditions.waterTemp}°C</Text>
            <Text style={styles.infoLabel}>{t.conditions.waterTemp}</Text>
          </View>
        )}
        {conditions.tide && (
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="wave" size={20} color={colors.primary} />
            <Text style={styles.infoValue}>{conditions.tide}</Text>
            <Text style={styles.infoLabel}>{t.conditions.tide}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  visualItem: {
    width: (SCREEN_WIDTH - spacing.lg * 2 - spacing.sm) / 2 - spacing.sm,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  visualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  visualLabel: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '600',
  },
  visualValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  waveContainer: {
    width: '100%',
    height: 70,
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  swellContainer: {
    width: '100%',
    height: 50,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  infoItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  infoValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  infoLabel: {
    ...typography.small,
    color: colors.textMuted,
  },
});
