import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';

interface ListRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  variant?: 'card' | 'sheet';
  showChevron?: boolean;
  iconColor?: string;
  style?: ViewStyle;
}

export function ListRow({
  icon,
  title,
  subtitle,
  onPress,
  variant = 'card',
  showChevron = true,
  iconColor = colors.primary,
  style,
}: ListRowProps) {
  const isSheet = variant === 'sheet';

  return (
    <TouchableOpacity
      style={[
        styles.base,
        isSheet ? styles.sheetVariant : [styles.cardVariant, shadows.sm],
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
        ) : null}
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  cardVariant: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    minHeight: 64,
  },
  sheetVariant: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    height: 56,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textMuted,
    marginTop: 2,
  },
});
