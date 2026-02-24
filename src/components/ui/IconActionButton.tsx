import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

interface IconActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export function IconActionButton({
  icon,
  label,
  onPress,
  size = 56,
  style,
}: IconActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Ionicons name={icon} size={24} color={colors.primaryLight} />
      </View>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  circle: {
    backgroundColor: colors.primaryFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: spacing.xs + 2,
    textAlign: 'center',
  },
});
