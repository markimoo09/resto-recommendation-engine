import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const mockPlaces = [
  { name: 'Shoyu Lab', detail: 'Ramen · 1.2 mi', visit: 'Sun night' },
  { name: 'Cedar Mezze', detail: 'Mediterranean · 0.6 mi', visit: 'Tue lunch' },
  { name: 'Pizzeria Lola', detail: 'Pizza · 2.1 mi', visit: 'Last week' },
];

export default function ReviewsScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors[colorScheme ?? 'light'].tint;
  const [selectedLocation, setSelectedLocation] = useState(mockPlaces[0]);
  const [rating, setRating] = useState(4);
  const [notes, setNotes] = useState('Loved the broth, service was quick, spice was just right.');

  const { cardBackground, borderColor, mutedText, inputBg } = useMemo(() => {
    const isDark = colorScheme === 'dark';
    return {
      cardBackground: isDark ? '#1c1f24' : '#f6f7fb',
      borderColor: isDark ? '#2d3137' : '#e6e8ec',
      mutedText: isDark ? '#9ea7b3' : '#5b6472',
      inputBg: isDark ? '#0f1115' : '#fff',
    };
  }, [colorScheme]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={styles.heading}>
          Rate
        </ThemedText>
        <ThemedText style={[styles.subheading, { color: mutedText }]}>
          Capture how the visit went so Kilo can tune your group’s taste.
        </ThemedText>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Location</ThemedText>
          {mockPlaces.map((place) => {
            const selected = place.name === selectedLocation.name;
            return (
              <Pressable
                key={place.name}
                onPress={() => setSelectedLocation(place)}
                style={({ pressed }) => [
                  styles.option,
                  {
                    borderColor,
                    backgroundColor: selected ? accent + '12' : cardBackground,
                  },
                  pressed && { opacity: 0.88 },
                ]}
              >
                <View>
                  <ThemedText style={styles.optionTitle}>{place.name}</ThemedText>
                  <ThemedText style={[styles.optionCaption, { color: mutedText }]}>
                    {place.detail}
                  </ThemedText>
                </View>
                <View style={[styles.pill, { backgroundColor: selected ? accent + '1a' : undefined }]}>
                  <ThemedText style={[styles.pillText, { color: selected ? accent : mutedText }]}>
                    {place.visit}
                  </ThemedText>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Photos</ThemedText>
          <View style={styles.photoRow}>
            <Pressable
              style={({ pressed }) => [
                styles.photoTile,
                {
                  borderColor,
                  backgroundColor: inputBg,
                },
                pressed && { opacity: 0.9 },
              ]}
            >
              <IconSymbol name="paperplane.fill" color={accent} size={26} />
              <ThemedText style={[styles.photoText, { color: accent }]}>Add photo</ThemedText>
            </Pressable>
            <View style={[styles.photoTile, { borderColor, backgroundColor: cardBackground }]}>
              <ThemedText style={styles.photoText}>dining_room.jpg</ThemedText>
              <ThemedText style={[styles.optionCaption, { color: mutedText }]}>Mock upload</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Notes</ThemedText>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            placeholder="Tell us what stood out — taste, ambience, service"
            placeholderTextColor={mutedText}
            style={[
              styles.textArea,
              {
                borderColor,
                backgroundColor: inputBg,
                color: Colors[colorScheme ?? 'light'].text,
              },
            ]}
          />
          <View style={styles.tagRow}>
            {['Service', 'Spice level', 'Ambience', 'Price'].map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: accent + '12' }]}>
                <ThemedText style={[styles.tagText, { color: accent }]}>{tag}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Overall rating</ThemedText>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Pressable
                key={value}
                onPress={() => setRating(value)}
                style={({ pressed }) => [styles.starButton, pressed && { transform: [{ scale: 0.96 }] }]}
              >
                <IconSymbol
                  name="star.fill"
                  size={32}
                  color={value <= rating ? accent : borderColor}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: accent },
            pressed && { opacity: 0.9 },
          ]}
        >
          <ThemedText style={styles.primaryText}>Submit rating</ThemedText>
          <ThemedText style={styles.primaryHint}>
            Not wired yet — this is the visual shape.
          </ThemedText>
        </Pressable>
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
    paddingBottom: 80,
  },
  heading: {
    marginBottom: 6,
  },
  subheading: {
    marginBottom: 16,
    fontSize: 15,
  },
  section: {
    marginBottom: 18,
  },
  label: {
    fontWeight: '700',
    marginBottom: 10,
  },
  option: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  optionCaption: {
    fontSize: 14,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: {
    fontWeight: '600',
  },
  photoRow: {
    flexDirection: 'row',
  },
  photoTile: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    fontWeight: '700',
    marginTop: 6,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontWeight: '700',
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  starButton: {
    marginRight: 8,
  },
  primaryButton: {
    borderRadius: 16,
    padding: 16,
    marginTop: 6,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  primaryHint: {
    color: '#e0f2ff',
    fontSize: 13,
    textAlign: 'center',
  },
});
