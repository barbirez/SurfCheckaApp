import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows, borderRadius } from '../../theme';

interface FloatingActionButtonProps {
  onPress: () => void;
  size?: number;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function FloatingActionButton({
  onPress,
  size = 60,
  icon = 'sparkles',
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.fab,
        shadows.lg,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={size * 0.45} color={colors.textPrimary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
