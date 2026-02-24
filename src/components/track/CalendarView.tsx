import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SurfSession } from '../../types';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { BottomSheet } from '../ui';

interface CalendarViewProps {
  visible: boolean;
  onClose: () => void;
  sessions: SurfSession[];
  onSelectSession: (session: SurfSession) => void;
}

export function CalendarView({
  visible,
  onClose,
  sessions,
  onSelectSession,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getSessionsForDay = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return sessions.filter((s) => s.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Calendário de Sessões"
    >
      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <Ionicons name="chevron-forward" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Week Days Header */}
      <View style={styles.weekDaysRow}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <ScrollView style={styles.calendarScroll}>
        <View style={styles.calendarGrid}>
          {days.map((day, index) => {
            if (day === null) {
              return <View key={`empty-${index}`} style={styles.dayCell} />;
            }

            const daySessions = getSessionsForDay(day);
            const hasSessions = daySessions.length > 0;

            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayCell,
                  hasSessions && styles.dayCellActive,
                ]}
                onPress={() => {
                  if (hasSessions) {
                    onSelectSession(daySessions[0]);
                  }
                }}
                disabled={!hasSessions}
              >
                <Text
                  style={[
                    styles.dayText,
                    hasSessions && styles.dayTextActive,
                  ]}
                >
                  {day}
                </Text>
                {hasSessions && (
                  <View style={styles.sessionDot} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.legendText}>Dia com sessão</Text>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  monthText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    ...typography.small,
    color: colors.textMuted,
    fontWeight: '600',
  },
  calendarScroll: {
    maxHeight: 320,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xs,
  },
  dayCellActive: {
    backgroundColor: colors.primaryFaint,
    borderRadius: borderRadius.md,
  },
  dayText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  dayTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  sessionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    marginTop: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...typography.small,
    color: colors.textMuted,
  },
});
