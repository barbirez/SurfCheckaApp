import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, spacing, typography } from '../../theme';
import { RootStackParamList, MagicFinderResult } from '../../types';
import { mockSpots, getTopRatedSpots } from '../../data/mockData';
import { t } from '../../i18n';

type SurfcheckScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Surfcheck'>;
};

const { width } = Dimensions.get('window');
const RADAR_SIZE = width * 0.75;

// Animated ring component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function SurfcheckScreen({ navigation }: SurfcheckScreenProps) {
  const [isSearching, setIsSearching] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const ring1Anim = useRef(new Animated.Value(0)).current;
  const ring2Anim = useRef(new Animated.Value(0)).current;
  const ring3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Idle breathing animation
    const breatheAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    breatheAnimation.start();

    return () => breatheAnimation.stop();
  }, []);

  useEffect(() => {
    if (isSearching) {
      // Fast rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Glow pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Ring expansion animations
      const ringAnimation = (anim: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: 1,
              duration: 1500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        );
      };

      ringAnimation(ring1Anim, 0).start();
      ringAnimation(ring2Anim, 500).start();
      ringAnimation(ring3Anim, 1000).start();

      // Navigate to results after search
      const timer = setTimeout(() => {
        setIsSearching(false);
        rotateAnim.setValue(0);

        // Create Magic Finder results from top spots
        const topSpots = getTopRatedSpots(3);
        const results: MagicFinderResult = {
          bestPick: topSpots[0],
          alternatives: topSpots.slice(1),
          conditionsSummary: {
            waveRange: topSpots[0].conditions.size,
            windCondition: `${topSpots[0].conditions.windSpeed}km/h ${topSpots[0].conditions.windDirection}`,
            period: topSpots[0].conditions.period,
            weather: topSpots[0].conditions.weather,
            temperature: topSpots[0].conditions.temperature,
          },
        };

        navigation.navigate('MagicFinderResults', { results });
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isSearching]);

  const handleSearch = () => {
    setIsSearching(true);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>{t.surfcheck.title}</Text>
          <Text style={styles.subtitle}>
            {isSearching ? t.surfcheck.searching : t.surfcheck.subtitle}
          </Text>
        </View>
      </View>

      {/* Radar Circle */}
      <View style={styles.radarContainer}>
        <TouchableOpacity
          onPress={handleSearch}
          disabled={isSearching}
          activeOpacity={0.9}
        >
          <Animated.View
            style={[
              styles.radarOuter,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            {/* SVG Radar with gradients */}
            <Svg
              width={RADAR_SIZE}
              height={RADAR_SIZE}
              viewBox="0 0 300 300"
              style={styles.radarSvg}
            >
              <Defs>
                <LinearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor={colors.primary} stopOpacity="0.5" />
                  <Stop offset="1" stopColor={colors.primaryLight} stopOpacity="0.1" />
                </LinearGradient>
                <LinearGradient id="sweepGradient" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor={colors.primary} stopOpacity="0" />
                  <Stop offset="1" stopColor={colors.primary} stopOpacity="1" />
                </LinearGradient>
              </Defs>

              {/* Background circles */}
              <Circle cx="150" cy="150" r="140" fill="none" stroke="url(#ringGradient)" strokeWidth="1" />
              <Circle cx="150" cy="150" r="105" fill="none" stroke="url(#ringGradient)" strokeWidth="1" />
              <Circle cx="150" cy="150" r="70" fill="none" stroke="url(#ringGradient)" strokeWidth="1" />
              <Circle cx="150" cy="150" r="35" fill="none" stroke="url(#ringGradient)" strokeWidth="1" />

              {/* Cross lines */}
              <Path d="M150,10 L150,290" stroke={colors.primary} strokeWidth="0.5" opacity="0.3" />
              <Path d="M10,150 L290,150" stroke={colors.primary} strokeWidth="0.5" opacity="0.3" />
              <Path d="M50,50 L250,250" stroke={colors.primary} strokeWidth="0.5" opacity="0.2" />
              <Path d="M250,50 L50,250" stroke={colors.primary} strokeWidth="0.5" opacity="0.2" />

              {/* Data points when searching */}
              {isSearching && (
                <G>
                  <Circle cx="180" cy="100" r="4" fill={colors.accent} opacity="0.8" />
                  <Circle cx="120" cy="180" r="3" fill={colors.primary} opacity="0.6" />
                  <Circle cx="200" cy="170" r="5" fill={colors.accent} opacity="0.9" />
                  <Circle cx="90" cy="120" r="3" fill={colors.primary} opacity="0.5" />
                </G>
              )}
            </Svg>

            {/* Animated expanding rings when searching */}
            {isSearching && (
              <View style={styles.expandingRings}>
                <Animated.View
                  style={[
                    styles.expandingRing,
                    {
                      opacity: ring1Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.6, 0],
                      }),
                      transform: [
                        {
                          scale: ring1Anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1.2],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.expandingRing,
                    {
                      opacity: ring2Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.6, 0],
                      }),
                      transform: [
                        {
                          scale: ring2Anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1.2],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.expandingRing,
                    {
                      opacity: ring3Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.6, 0],
                      }),
                      transform: [
                        {
                          scale: ring3Anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1.2],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            )}

            {/* Rotating sweep */}
            {isSearching && (
              <Animated.View
                style={[
                  styles.sweepContainer,
                  { transform: [{ rotate: rotation }] },
                ]}
              >
                <View style={styles.sweep} />
              </Animated.View>
            )}

            {/* Center button */}
            <Animated.View
              style={[
                styles.centerButton,
                isSearching && {
                  shadowOpacity: glowOpacity,
                },
              ]}
            >
              <Ionicons
                name="flash"
                size={36}
                color={colors.textPrimary}
              />
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{t.surfcheck.poweredBy}</Text>
      </View>
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
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.sm,
  },
  headerText: {
    flex: 1,
    paddingTop: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  radarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarOuter: {
    width: RADAR_SIZE,
    height: RADAR_SIZE,
    borderRadius: RADAR_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 124, 255, 0.08)',
  },
  radarSvg: {
    position: 'absolute',
  },
  expandingRings: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandingRing: {
    position: 'absolute',
    width: RADAR_SIZE,
    height: RADAR_SIZE,
    borderRadius: RADAR_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  sweepContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweep: {
    position: 'absolute',
    width: '50%',
    height: 3,
    left: '50%',
    backgroundColor: colors.primary,
    borderRadius: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  centerButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(74, 124, 255, 0.3)',
  },
  footer: {
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
