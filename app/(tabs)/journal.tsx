import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const entries = [
  {
    name: 'Shoyu Lab',
    group: 'Weekend Foodies',
    notes: 'Warm broth, veg options, quiet enough to chat.',
    tags: ['Perfect Fit', 'Veg options', '<$25'],
    rating: 5,
    meta: 'Sun · 8:30 PM · 1.2 mi',
  },
  {
    name: 'Cedar Mezze',
    group: 'Tuesday Lunch Crew',
    notes: 'Fast service, good shareables, terrace seating.',
    tags: ['Safe', 'Outdoor', 'Quick'],
    rating: 4,
    meta: 'Tue · 12:10 PM · 0.6 mi',
  },
  {
    name: 'Pizzeria Lola',
    group: 'Family Dinner',
    notes: 'Kid-friendly, dairy-free options, easy parking.',
    tags: ['Family', 'Low spice', 'Parking'],
    rating: 4,
    meta: 'Fri · 6:45 PM · 2.1 mi',
  },
];

export default function ReviewHistoryScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors[colorScheme ?? 'light'].tint;

  const { cardBackground, borderColor, mutedText } = useMemo(() => {
    const isDark = colorScheme === 'dark';
    return {
      cardBackground: isDark ? '#1c1f24' : '#f6f7fb',
      borderColor: isDark ? '#2d3137' : '#e6e8ec',
      mutedText: isDark ? '#9ea7b3' : '#5b6472',
    };
  }, [colorScheme]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <ThemedText type="title">Journal</ThemedText>
            <ThemedText style={[styles.subheading, { color: mutedText }]}>
              Track the places you rated and keep context for the group.
            </ThemedText>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              { borderColor },
              pressed && { opacity: 0.85 },
            ]}
          >
            <ThemedText style={[styles.secondaryText, { color: accent }]}>
              New rating
            </ThemedText>
          </Pressable>
        </View>

        {entries.map((entry) => (
          <Pressable
            key={entry.name}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: cardBackground, borderColor },
              pressed && { transform: [{ scale: 0.99 }] },
            ]}
          >
            <View style={styles.cardHeader}>
              <View>
                <ThemedText type="subtitle">{entry.name}</ThemedText>
                <ThemedText style={[styles.muted, { color: mutedText }]}>
                  {entry.meta}
                </ThemedText>
              </View>
              <View style={styles.ratingRow}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <IconSymbol
                    key={index}
                    name="star.fill"
                    size={18}
                    color={index < entry.rating ? accent : borderColor}
                  />
                ))}
              </View>
            </View>

            <ThemedText style={styles.note}>{entry.notes}</ThemedText>
            <View style={styles.tagRow}>
              {entry.tags.map((tag) => (
                <View key={tag} style={[styles.tag, { backgroundColor: accent + '12' }]}>
                  <ThemedText style={[styles.tagText, { color: accent }]}>
                    {tag}
                  </ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.footerRow}>
              <View style={[styles.pill, { backgroundColor: accent + '1a' }]}>
                <ThemedText style={[styles.pillText, { color: accent }]}>
                  {entry.group}
                </ThemedText>
              </View>
              <Pressable
                style={({ pressed }) => [styles.linkRow, pressed && { opacity: 0.85 }]}
              >
                <ThemedText style={[styles.linkText, { color: accent }]}>
                  View full rating
                </ThemedText>
                <IconSymbol name="chevron.right" size={18} color={accent} />
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subheading: {
    marginTop: 6,
    fontSize: 15,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryText: {
    fontWeight: '700',
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  muted: {
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: 'row',
  },
  note: {
    fontSize: 15,
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: {
    fontWeight: '600',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontWeight: '700',
    marginRight: 4,
  },
});
