import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, shadows, typography } from '../../theme';

interface CustomTabBarProps extends BottomTabBarProps {
  onMagicFinderPress: () => void;
}

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Search: 'search-outline',
  Conditions: 'water-outline',
  Track: 'fitness-outline',
  Profile: 'person-outline',
};

const TAB_ICONS_FOCUSED: Record<string, keyof typeof Ionicons.glyphMap> = {
  Search: 'search',
  Conditions: 'water',
  Track: 'fitness',
  Profile: 'person',
};

export function CustomTabBar({
  state,
  descriptors,
  navigation,
  onMagicFinderPress,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  const leftTabs = state.routes.slice(0, 2);
  const rightTabs = state.routes.slice(2);

  const renderTab = (route: typeof state.routes[0], index: number, isRight: boolean) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;
    const actualIndex = isRight ? index + 2 : index;
    const isFocused = state.index === actualIndex;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const iconName = isFocused
      ? TAB_ICONS_FOCUSED[route.name]
      : TAB_ICONS[route.name];

    const iconColor = isFocused ? colors.primary : colors.textMuted;

    return (
      <TouchableOpacity
        key={route.key}
        style={styles.tab}
        onPress={onPress}
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
      >
        <View style={styles.iconWrapper}>
          {isFocused && <View style={styles.activePill} />}
          <Ionicons
            name={iconName || 'ellipse'}
            size={24}
            color={iconColor}
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            {
              color: iconColor,
              fontWeight: isFocused ? '600' : '500',
            },
          ]}
        >
          {label as string}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        <View style={styles.tabGroup}>
          {leftTabs.map((route, index) => renderTab(route, index, false))}
        </View>

        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={[styles.fab, shadows.lg]}
            onPress={onMagicFinderPress}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabGroup}>
          {rightTabs.map((route, index) => renderTab(route, index, true))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tabBarBg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 49,
    paddingHorizontal: spacing.sm,
  },
  tabGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    minWidth: 60,
  },
  iconWrapper: {
    width: 36,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    position: 'absolute',
    width: 36,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.tabActiveIndicator,
  },
  tabLabel: {
    ...typography.small,
    fontSize: 11,
    marginTop: 2,
  },
  fabContainer: {
    width: 70,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
