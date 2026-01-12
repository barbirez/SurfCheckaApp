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
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components';
import { RootStackParamList } from '../../types';
import { t } from '../../i18n';

type CheckInScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CheckIn'>;
  route: RouteProp<RootStackParamList, 'CheckIn'>;
};

const durationOptions = [30, 45, 60, 90, 120, 150, 180];

const beachOptions = [
  { id: '1', name: 'Campeche' },
  { id: '2', name: 'Joaquina' },
  { id: '3', name: 'Praia Mole' },
  { id: '4', name: 'Barra da Lagoa' },
  { id: '5', name: 'Santinho' },
];

function StarRatingInput({
  rating,
  onRatingChange
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
}) {
  return (
    <View style={styles.starInputContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingChange(star)}
          style={styles.starButton}
        >
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={32}
            color={star <= rating ? colors.accent : colors.textMuted}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function CheckInScreen({ navigation, route }: CheckInScreenProps) {
  const [selectedBeach, setSelectedBeach] = useState<string | null>(route.params?.spotId || null);
  const [duration, setDuration] = useState<number>(60);
  const [conditionRating, setConditionRating] = useState<number>(0);
  const [surfRating, setSurfRating] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    }
    return `${mins}min`;
  };

  const handleSave = () => {
    if (!selectedBeach) {
      Alert.alert('Atenção', 'Selecione um pico para registrar a sessão.');
      return;
    }
    if (conditionRating === 0 || surfRating === 0) {
      Alert.alert('Atenção', 'Avalie as condições e qualidade do surf.');
      return;
    }

    // In a real app, save to AsyncStorage or backend
    Alert.alert('Sucesso!', 'Sessão registrada com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.surfTracker.checkIn.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Beach Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.surfTracker.checkIn.location}</Text>
          <View style={styles.beachGrid}>
            {beachOptions.map((beach) => (
              <TouchableOpacity
                key={beach.id}
                style={[
                  styles.beachOption,
                  selectedBeach === beach.id && styles.beachOptionSelected,
                ]}
                onPress={() => setSelectedBeach(beach.id)}
              >
                <Text
                  style={[
                    styles.beachOptionText,
                    selectedBeach === beach.id && styles.beachOptionTextSelected,
                  ]}
                >
                  {beach.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.surfTracker.checkIn.duration}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.durationContainer}
          >
            {durationOptions.map((mins) => (
              <TouchableOpacity
                key={mins}
                style={[
                  styles.durationOption,
                  duration === mins && styles.durationOptionSelected,
                ]}
                onPress={() => setDuration(mins)}
              >
                <Text
                  style={[
                    styles.durationText,
                    duration === mins && styles.durationTextSelected,
                  ]}
                >
                  {formatDuration(mins)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Condition Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.surfTracker.checkIn.conditionRating}</Text>
          <Text style={styles.ratingHint}>Como estavam as condições do mar?</Text>
          <StarRatingInput rating={conditionRating} onRatingChange={setConditionRating} />
        </View>

        {/* Surf Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.surfTracker.checkIn.surfRating}</Text>
          <Text style={styles.ratingHint}>Como foi sua sessão?</Text>
          <StarRatingInput rating={surfRating} onRatingChange={setSurfRating} />
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.surfTracker.checkIn.notes}</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Adicione observações sobre a sessão..."
            placeholderTextColor={colors.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={t.surfTracker.checkIn.save}
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
  closeButton: {
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
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  beachGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  beachOption: {
    backgroundColor: colors.backgroundCard,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  beachOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(74, 124, 255, 0.2)',
  },
  beachOptionText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  beachOptionTextSelected: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  durationContainer: {
    gap: spacing.sm,
  },
  durationOption: {
    backgroundColor: colors.backgroundCard,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  durationOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(74, 124, 255, 0.2)',
  },
  durationText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  durationTextSelected: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  ratingHint: {
    ...typography.small,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  starInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  starButton: {
    padding: spacing.sm,
  },
  notesInput: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: 16,
    minHeight: 100,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
