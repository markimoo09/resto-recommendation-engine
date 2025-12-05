import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const stats = [
  { label: 'Groups', value: '3' },
  { label: 'Ratings', value: '18' },
  { label: 'Saved picks', value: '9' },
];

const preferences = [
  { label: 'Diet', value: 'Pescatarian + dairy-light' },
  { label: 'Budget', value: '<$30 casual · <$55 dinner' },
  { label: 'Distance', value: 'Weekday 3 mi · Weekend 5 mi' },
  { label: 'Ambience', value: 'Quiet, cozy, music low' },
];

export default function ProfileScreen() {
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
        <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: accent + '1a' }]}>
              <ThemedText style={[styles.avatarText, { color: accent }]}>M</ThemedText>
            </View>
            <View>
              <ThemedText type="title">Morgan Lee</ThemedText>
              <ThemedText style={[styles.muted, { color: mutedText }]}>morgan@example.com</ThemedText>
              <ThemedText style={[styles.muted, { color: mutedText }]}>Joined Jan 2024</ThemedText>
            </View>
          </View>
          <View style={styles.statRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
                <ThemedText style={[styles.statLabel, { color: mutedText }]}>
                  {stat.label}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
          <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
          {preferences.map((pref) => (
            <View key={pref.label} style={styles.prefRow}>
              <ThemedText style={styles.prefLabel}>{pref.label}</ThemedText>
              <ThemedText style={[styles.prefValue, { color: mutedText }]}>
                {pref.value}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#111418' : '#fff', borderColor }]}>
          <ThemedText style={styles.sectionTitle}>Actions</ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: accent },
              pressed && { opacity: 0.9 },
            ]}
          >
            <View style={styles.primaryRow}>
              <IconSymbol name="sparkles" size={22} color="#fff" />
              <ThemedText style={styles.primaryText}>Update onboarding</ThemedText>
            </View>
            <ThemedText style={styles.primaryHint}>
              Refresh cuisine, spice, ambience, budget, and distance preferences.
            </ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              { borderColor },
              pressed && { opacity: 0.88 },
            ]}
          >
            <View style={styles.inlineRow}>
              <IconSymbol name="book.fill" size={20} color={accent} />
              <ThemedText style={[styles.secondaryText, { color: accent }]}>
                Notification settings
              </ThemedText>
            </View>
            <ThemedText style={[styles.muted, { color: mutedText }]}>Push prompts for invites and post-visit ratings.</ThemedText>
          </Pressable>
        </View>
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
    paddingTop: 32,
    paddingBottom: 60,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '800',
  },
  muted: {
    fontSize: 14,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  statValue: {
    fontWeight: '800',
    fontSize: 20,
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 16,
  },
  prefRow: {
    marginBottom: 12,
  },
  prefLabel: {
    fontWeight: '700',
    marginBottom: 4,
  },
  prefValue: {
    fontSize: 14,
  },
  primaryButton: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  primaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
  },
  primaryHint: {
    color: '#e0f2ff',
    fontSize: 13,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  secondaryText: {
    fontWeight: '700',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
});
