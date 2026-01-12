import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius } from '../theme';

interface ImagePlaceholderProps {
  width?: number | string;
  height?: number;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  variant?: 'beach' | 'video' | 'article' | 'profile';
}

export function ImagePlaceholder({
  width = '100%',
  height = 150,
  icon,
  style,
  variant = 'beach',
}: ImagePlaceholderProps) {
  const getIcon = (): keyof typeof Ionicons.glyphMap => {
    if (icon) return icon;
    switch (variant) {
      case 'beach':
        return 'image-outline';
      case 'video':
        return 'play-circle-outline';
      case 'article':
        return 'document-text-outline';
      case 'profile':
        return 'person-outline';
      default:
        return 'image-outline';
    }
  };

  return (
    <View
      style={[
        styles.container,
        { width: width as any, height },
        style,
      ]}
    >
      <Ionicons name={getIcon()} size={40} color={colors.textMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
