import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ImagePlaceholder } from '../../components';
import { ListRow } from '../../components/ui';
import { useUser } from '../../context/UserContext';
import { RootStackParamList, SurfExperience, SurfLevel } from '../../types';
import { t } from '../../i18n';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const experienceLabels: Record<SurfExperience, string> = {
  'less_than_year': t.onboarding.experience.options.lessThanYear,
  '1_2_years': t.onboarding.experience.options.oneToTwo,
  '3_5_years': t.onboarding.experience.options.threeToFive,
  '5_plus_years': t.onboarding.experience.options.fivePlus,
};

const levelLabels: Record<SurfLevel, string> = {
  'beginner': t.onboarding.level.options.beginner,
  'intermediate': t.onboarding.level.options.intermediate,
  'advanced': t.onboarding.level.options.advanced,
};

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, resetUser } = useUser();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    resetUser();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t.profile.title}</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <ImagePlaceholder
            width={80}
            height={80}
            variant="profile"
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="pencil" size={14} color={colors.textPrimary} />
            <Text style={styles.editText}>{t.profile.editProfile}</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.profile.yourInfo}</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>{t.profile.surfingFor}</Text>
                <Text style={styles.infoValue}>
                  {user.experience ? experienceLabels[user.experience] : '-'}
                </Text>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>{t.profile.level}</Text>
                <Text style={styles.infoValue}>
                  {user.level ? levelLabels[user.level] : '-'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <ListRow
            icon="settings-outline"
            title={t.profile.settings}
            onPress={() => {}}
            variant="card"
          />
          <ListRow
            icon="log-out-outline"
            title={t.profile.logout}
            onPress={handleLogout}
            variant="card"
            showChevron={false}
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.pageTitle,
    color: colors.textPrimary,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  avatar: {
    borderRadius: 40,
    marginBottom: spacing.md,
  },
  userName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    gap: spacing.xs,
  },
  editText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  infoCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  infoRow: {
    paddingVertical: spacing.sm,
  },
  infoItem: {},
  infoLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  infoValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.backgroundDark,
    marginVertical: spacing.sm,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
