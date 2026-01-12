import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../theme';
import { Button, SelectOption } from '../../components';
import { OnboardingStackParamList, SurfExperience } from '../../types';
import { useUser } from '../../context/UserContext';
import { t } from '../../i18n';

type ExperienceScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Experience'>;
};

const experienceOptions: { value: SurfExperience; label: string }[] = [
  { value: 'less_than_year', label: t.onboarding.experience.options.lessThanYear },
  { value: '1_2_years', label: t.onboarding.experience.options.oneToTwo },
  { value: '3_5_years', label: t.onboarding.experience.options.threeToFive },
  { value: '5_plus_years', label: t.onboarding.experience.options.fivePlus },
];

export function ExperienceScreen({ navigation }: ExperienceScreenProps) {
  const { user, setExperience } = useUser();
  const [selected, setSelected] = useState<SurfExperience | null>(user.experience);

  const handleNext = () => {
    if (selected) {
      setExperience(selected);
      navigation.navigate('Level');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Level');
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
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>{t.onboarding.experience.header}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{t.onboarding.experience.question}</Text>

        <View style={styles.optionsContainer}>
          {experienceOptions.map((option) => (
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
          disabled={!selected}
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
