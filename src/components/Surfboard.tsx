import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Ellipse, Polygon } from 'react-native-svg';
import { colors } from '../theme';

interface SurfboardProps {
  width?: number;
  height?: number;
}

export function Surfboard({ width = 200, height = 350 }: SurfboardProps) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 200 350"
        style={{ transform: [{ rotate: '-25deg' }] }}
      >
        {/* Surfboard body */}
        <Path
          d="M100 10
             C130 10, 155 40, 160 80
             L170 280
             C170 310, 140 340, 100 340
             C60 340, 30 310, 30 280
             L40 80
             C45 40, 70 10, 100 10Z"
          fill={colors.surfboardGreen}
          stroke={colors.surfboardGreenDark}
          strokeWidth="2"
        />
        {/* Surfboard stripe */}
        <Path
          d="M100 30
             C120 30, 140 50, 145 80
             L150 260
             C150 280, 130 300, 100 300"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="20"
        />
        {/* Star decoration */}
        <Polygon
          points="100,60 103,70 113,70 105,77 108,87 100,81 92,87 95,77 87,70 97,70"
          fill={colors.surfboardStar}
        />
        {/* Fin */}
        <Path
          d="M100 290 L85 320 L100 310 L115 320 Z"
          fill={colors.surfboardGreenDark}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
