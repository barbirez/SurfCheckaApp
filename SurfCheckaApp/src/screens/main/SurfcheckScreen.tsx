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
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../theme';
import { RootStackParamList } from '../../types';

type SurfcheckScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Surfcheck'>;
};

const { width } = Dimensions.get('window');
const RADAR_SIZE = width * 0.7;

export function SurfcheckScreen({ navigation }: SurfcheckScreenProps) {
  const [isSearching, setIsSearching] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSearching) {
      // Rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Navigate to recommendations after search
      const timer = setTimeout(() => {
        setIsSearching(false);
        navigation.navigate('Recommendations');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSearching, rotateAnim, pulseAnim, navigation]);

  const handleSearch = () => {
    setIsSearching(true);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Surfcheck</Text>
        <Text style={styles.subtitle}>Tap to find the ideal spot for you</Text>
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
            {/* Radar rings */}
            <View style={styles.radarRings}>
              <View style={[styles.ring, styles.ring1]} />
              <View style={[styles.ring, styles.ring2]} />
              <View style={[styles.ring, styles.ring3]} />
              <View style={[styles.ring, styles.ring4]} />
            </View>

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
            <View style={styles.centerButton}>
              <Ionicons
                name="search"
                size={32}
                color={colors.textPrimary}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by FinFun</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
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
    backgroundColor: 'rgba(74, 124, 255, 0.1)',
  },
  radarRings: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(74, 124, 255, 0.3)',
  },
  ring1: {
    width: '100%',
    height: '100%',
  },
  ring2: {
    width: '75%',
    height: '75%',
  },
  ring3: {
    width: '50%',
    height: '50%',
  },
  ring4: {
    width: '25%',
    height: '25%',
  },
  sweepContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sweep: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    height: 2,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    transformOrigin: 'left center',
  },
  centerButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
