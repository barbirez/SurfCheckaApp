import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchScreen, ConditionsScreen, TrackScreen, ProfileScreen } from '../screens/main';
import { CustomTabBar } from '../components/layout';
import { MainTabParamList, RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainNavigator() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleMagicFinderPress = () => {
    navigation.navigate('MagicFinder');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <CustomTabBar {...props} onMagicFinderPress={handleMagicFinderPress} />
      )}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Buscar',
        }}
      />
      <Tab.Screen
        name="Conditions"
        component={ConditionsScreen}
        options={{
          tabBarLabel: 'Condições',
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          tabBarLabel: 'Tracker',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}
