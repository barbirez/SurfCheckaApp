import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../theme';
import { Button, SelectOption } from '../../components';
import { OnboardingStackParamList, SurfLevel } from '../../types';
import { useUser } from '../../context/UserContext';
import { t } from '../../i18n';

type LevelScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Level'>;
};

const levelOptions: { value: SurfLevel; label: string }[] = [
  { value: 'beginner', label: t.onboarding.level.options.beginner },
  { value: 'intermediate', label: t.onboarding.level.options.intermediate },
  { value: 'advanced', label: t.onboarding.level.options.advanced },
];

export function LevelScreen({ navigation }: LevelScreenProps) {
  const { user, setLevel, completeOnboarding } = useUser();
  const [selected, setSelected] = useState<SurfLevel | null>(user.level);

  const handleNext = () => {
    if (selected) {
      setLevel(selected);
    }
    completeOnboarding();
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>{t.onboarding.level.header}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{t.onboarding.level.question}</Text>

        <View style={styles.optionsContainer}>
          {levelOptions.map((option) => (
            <SelectOption
              key={option.value}
              label={option.label}
              selected={selected === option.value}
              onPress={() => setSelected(option.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>{t.skip}</Text>
        </TouchableOpacity>
        <Button
          title={t.next}
          onPress={handleNext}
          variant="outline"
          size="medium"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onboardingBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.textPrimary,
    borderRadius: 2,
  },
  labelContainer: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  question: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  optionsContainer: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
});
