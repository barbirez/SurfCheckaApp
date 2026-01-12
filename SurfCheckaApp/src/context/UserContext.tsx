import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, SurfExperience, SurfLevel } from '../types';

interface UserContextType {
  user: UserProfile;
  isLoading: boolean;
  setExperience: (experience: SurfExperience) => void;
  setLevel: (level: SurfLevel) => void;
  setName: (name: string) => void;
  completeOnboarding: () => void;
  addFavoriteSpot: (spotId: string) => void;
  removeFavoriteSpot: (spotId: string) => void;
  resetUser: () => void;
}

const defaultUser: UserProfile = {
  name: 'Surfer',
  experience: null,
  level: null,
  onboardingComplete: false,
  favoriteSpots: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = '@surfcheck_user';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (updatedUser: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const setExperience = (experience: SurfExperience) => {
    saveUser({ ...user, experience });
  };

  const setLevel = (level: SurfLevel) => {
    saveUser({ ...user, level });
  };

  const setName = (name: string) => {
    saveUser({ ...user, name });
  };

  const completeOnboarding = () => {
    saveUser({ ...user, onboardingComplete: true });
  };

  const addFavoriteSpot = (spotId: string) => {
    if (!user.favoriteSpots.includes(spotId)) {
      saveUser({ ...user, favoriteSpots: [...user.favoriteSpots, spotId] });
    }
  };

  const removeFavoriteSpot = (spotId: string) => {
    saveUser({
      ...user,
      favoriteSpots: user.favoriteSpots.filter((id) => id !== spotId),
    });
  };

  const resetUser = () => {
    saveUser(defaultUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        setExperience,
        setLevel,
        setName,
        completeOnboarding,
        addFavoriteSpot,
        removeFavoriteSpot,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
