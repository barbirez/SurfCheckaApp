import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, borderRadius, spacing } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'softPrimary' | 'dark';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    variantStyles[variant],
    fullWidth ? styles.fullWidth : sizeStyles[size],
    disabled ? styles.disabled : undefined,
    style,
  ];

  const resolvedTextStyles = [
    styles.text,
    variantTextStyles[variant],
    fullWidth ? styles.fullWidthText : sizeTextStyles[size],
    textStyle,
  ];

  const loaderColor =
    variant === 'primary' || variant === 'dark'
      ? colors.textDark
      : colors.textPrimary;

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <Text style={resolvedTextStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
    height: 54,
    borderRadius: borderRadius.round,
  },
  fullWidthText: {
    fontSize: 17,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.45,
  },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  secondary: {
    backgroundColor: colors.buttonSecondary,
    borderRadius: borderRadius.md,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.textPrimary,
    borderRadius: borderRadius.md,
  },
  text: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
  },
  softPrimary: {
    backgroundColor: colors.primaryFaint,
    borderRadius: borderRadius.md,
  },
  dark: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: borderRadius.lg,
  },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  secondary: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  outline: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  text: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  softPrimary: {
    color: colors.primaryLight,
    fontWeight: '600',
  },
  dark: {
    color: colors.textDark,
    fontWeight: '600',
  },
};

const sizeStyles: Record<string, ViewStyle> = {
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minWidth: 80,
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minWidth: 120,
  },
  large: {
    paddingVertical: spacing.lg - 4,
    paddingHorizontal: spacing.xl,
    minWidth: 160,
  },
};

const sizeTextStyles: Record<string, TextStyle> = {
  small: { fontSize: 14 },
  medium: { fontSize: 16 },
  large: { fontSize: 18 },
};
