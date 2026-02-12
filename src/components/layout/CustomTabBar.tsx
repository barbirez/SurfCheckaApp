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

  // Split tabs into left and right groups (2 on each side of FAB)
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

    return (
      <TouchableOpacity
        key={route.key}
        style={styles.tab}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
      >
        <Ionicons
          name={iconName || 'ellipse'}
          size={24}
          color={isFocused ? colors.primary : colors.textMuted}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: isFocused ? colors.primary : colors.textMuted },
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
        {/* Left tabs */}
        <View style={styles.tabGroup}>
          {leftTabs.map((route, index) => renderTab(route, index, false))}
        </View>

        {/* Center FAB */}
        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={[styles.fab, shadows.lg]}
            onPress={onMagicFinderPress}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Right tabs */}
        <View style={styles.tabGroup}>
          {rightTabs.map((route, index) => renderTab(route, index, true))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundCard,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 65,
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
    paddingVertical: spacing.sm,
    minWidth: 60,
  },
  tabLabel: {
    ...typography.small,
    marginTop: spacing.xs,
    fontWeight: '500',
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
