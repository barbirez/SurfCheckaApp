import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../theme';

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export function FilterPill({
  label,
  active,
  onPress,
  rightIcon,
  style,
}: FilterPillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        active ? styles.active : styles.inactive,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>
        {label}
      </Text>
      {rightIcon && (
        <Ionicons
          name={rightIcon}
          size={14}
          color={active ? colors.textPrimary : colors.textSecondary}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: 34,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: colors.primary,
  },
  inactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeLabel: {
    color: colors.textPrimary,
  },
  inactiveLabel: {
    color: colors.textSecondary,
  },
  icon: {
    marginLeft: spacing.xs,
  },
});
