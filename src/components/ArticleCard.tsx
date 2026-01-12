import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { Article } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

interface ArticleCardProps {
  article: Article;
  onPress?: () => void;
}

export function ArticleCard({ article, onPress }: ArticleCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <ImagePlaceholder
        width="100%"
        height={100}
        variant="article"
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.category}>{article.category}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
      </View>
      <View style={styles.footer}>
        <Ionicons name="arrow-forward" size={16} color={colors.primary} />
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
  image: {
    borderRadius: 0,
  },
  content: {
    padding: spacing.md,
  },
  category: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    alignItems: 'flex-end',
  },
});
