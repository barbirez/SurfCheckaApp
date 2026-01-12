import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, borderRadius, spacing } from '../theme';

interface SelectOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  variant?: 'blue' | 'dark';
}

export function SelectOption({
  label,
  selected,
  onPress,
  variant = 'blue',
}: SelectOptionProps) {
  const containerStyles = [
    styles.container,
    variant === 'blue' ? styles.blueVariant : styles.darkVariant,
    selected && styles.selected,
  ];

  const textStyles = [
    styles.text,
    selected && styles.selectedText,
  ];

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  blueVariant: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  darkVariant: {
    backgroundColor: colors.backgroundCard,
  },
  selected: {
    backgroundColor: colors.accent,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.textDark,
    fontWeight: '600',
  },
});
