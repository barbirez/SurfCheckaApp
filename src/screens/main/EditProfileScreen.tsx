import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button, SelectOption, ImagePlaceholder } from '../../components';
import { useUser } from '../../context/UserContext';
import { RootStackParamList, SurfExperience, SurfLevel } from '../../types';
import { t } from '../../i18n';

type EditProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
};

const experienceOptions: { value: SurfExperience; label: string }[] = [
  { value: 'less_than_year', label: t.onboarding.experience.options.lessThanYear },
  { value: '1_2_years', label: t.onboarding.experience.options.oneToTwo },
  { value: '3_5_years', label: t.onboarding.experience.options.threeToFive },
  { value: '5_plus_years', label: t.onboarding.experience.options.fivePlus },
];

const levelOptions: { value: SurfLevel; label: string }[] = [
  { value: 'beginner', label: t.onboarding.level.options.beginner },
  { value: 'intermediate', label: t.onboarding.level.options.intermediate },
  { value: 'advanced', label: t.onboarding.level.options.advanced },
];

export function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const { user, setName, setExperience, setLevel } = useUser();
  const [name, setNameState] = useState(user.name);
  const [experience, setExperienceState] = useState<SurfExperience | null>(user.experience);
  const [level, setLevelState] = useState<SurfLevel | null>(user.level);

  const handleSave = () => {
    if (name.trim()) {
      setName(name.trim());
    }
    if (experience) {
      setExperience(experience);
    }
    if (level) {
      setLevel(level);
    }
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.profile.editProfile}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <ImagePlaceholder
            width={100}
            height={100}
            variant="profile"
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nome</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setNameState}
            placeholder="Seu nome"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.onboarding.experience.question}</Text>
          <View style={styles.optionsContainer}>
            {experienceOptions.map((option) => (
              <SelectOption
                key={option.value}
                label={option.label}
                selected={experience === option.value}
                onPress={() => setExperienceState(option.value)}
                variant="dark"
              />
            ))}
          </View>
        </View>

        {/* Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.onboarding.level.question}</Text>
          <View style={styles.optionsContainer}>
            {levelOptions.map((option) => (
              <SelectOption
                key={option.value}
                label={option.label}
                selected={level === option.value}
                onPress={() => setLevelState(option.value)}
                variant="dark"
              />
            ))}
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={t.save}
            onPress={handleSave}
            variant="primary"
            size="large"
            fullWidth
          />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    borderRadius: 50,
    marginBottom: spacing.md,
  },
  changePhotoButton: {
    paddingVertical: spacing.sm,
  },
  changePhotoText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  textInput: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: 16,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
