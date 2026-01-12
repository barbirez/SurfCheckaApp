import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { YouTubeVideo } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.75;

interface YouTubeCardProps {
  video: YouTubeVideo;
  onPress?: () => void;
}

export function YouTubeCard({ video, onPress }: YouTubeCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (video.videoUrl) {
      Linking.openURL(video.videoUrl);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.thumbnailContainer}>
        <ImagePlaceholder
          width="100%"
          height={140}
          variant="video"
          style={styles.thumbnail}
        />
        <View style={styles.playButton}>
          <Ionicons name="play" size={24} color={colors.textPrimary} />
        </View>
        {video.duration && (
          <View style={styles.duration}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        <View style={styles.channelInfo}>
          <Ionicons name="logo-youtube" size={14} color="#FF0000" />
          <Text style={styles.channelName}>FinFunSurf</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    borderRadius: 0,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -25,
    marginLeft: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  content: {
    padding: spacing.md,
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  channelName: {
    ...typography.small,
    color: colors.textMuted,
  },
});
