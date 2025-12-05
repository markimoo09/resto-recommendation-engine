import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const mockPlaces = [
  { name: "Shoyu Lab", detail: "Ramen · 1.2 mi" },
  { name: "Cedar Mezze", detail: "Mediterranean · 0.6 mi" },
  { name: "Pizzeria Lola", detail: "Pizza · 2.1 mi" },
];

const quickTags = [
  "Great service",
  "Spicy",
  "Cozy vibe",
  "Good value",
  "Quiet",
];

export default function ReviewsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const accent = Colors[colorScheme ?? "light"].tint;
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof mockPlaces)[0] | null
  >(null);
  const [rating, setRating] = useState(4);
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const palette = useMemo(
    () => ({
      surface: isDark ? "#1a1d21" : "#f8f9fb",
      surfaceAlt: isDark ? "#22262c" : "#fff",
      border: isDark ? "#2a2f36" : "#e8eaed",
      muted: isDark ? "#8b939e" : "#6b7280",
      subtle: isDark ? "#3a4049" : "#dfe2e6",
      inputBg: isDark ? "#0d0f12" : "#fff",
    }),
    [isDark]
  );

  const filteredPlaces = searchQuery
    ? mockPlaces.filter((place) =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSelectPlace = (place: (typeof mockPlaces)[0]) => {
    setSelectedLocation(place);
    setSearchQuery(place.name);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Rate</ThemedText>
          <ThemedText style={[styles.headerSub, { color: palette.muted }]}>
            Share your dining experience
          </ThemedText>
        </View>

        {/* Location Search */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
            LOCATION
          </ThemedText>
          <View
            style={[
              styles.searchBox,
              {
                borderColor: palette.border,
                backgroundColor: palette.inputBg,
              },
            ]}
          >
            <IconSymbol name="location.fill" size={16} color={palette.muted} />
            <TextInput
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                if (!text) setSelectedLocation(null);
              }}
              placeholder="Search for a restaurant"
              placeholderTextColor={palette.muted}
              style={[
                styles.searchInput,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            />
          </View>
          {filteredPlaces.length > 0 && !selectedLocation && (
            <View
              style={[
                styles.suggestionList,
                {
                  backgroundColor: palette.surfaceAlt,
                  borderColor: palette.border,
                },
              ]}
            >
              {filteredPlaces.map((place) => (
                <Pressable
                  key={place.name}
                  onPress={() => handleSelectPlace(place)}
                  style={({ pressed }) => [
                    styles.suggestion,
                    pressed && { backgroundColor: palette.surface },
                  ]}
                >
                  <View
                    style={[
                      styles.placeIcon,
                      { backgroundColor: accent + "14" },
                    ]}
                  >
                    <IconSymbol name="location.fill" size={14} color={accent} />
                  </View>
                  <View style={styles.placeInfo}>
                    <ThemedText style={styles.placeName}>
                      {place.name}
                    </ThemedText>
                    <ThemedText
                      style={[styles.placeDetail, { color: palette.muted }]}
                    >
                      {place.detail}
                    </ThemedText>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Star Rating */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
            RATING
          </ThemedText>
          <View
            style={[
              styles.ratingCard,
              { backgroundColor: palette.surface, borderColor: palette.border },
            ]}
          >
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Pressable
                  key={value}
                  onPress={() => setRating(value)}
                  style={({ pressed }) => [
                    styles.starBtn,
                    pressed && { transform: [{ scale: 0.9 }] },
                  ]}
                >
                  <IconSymbol
                    name="star.fill"
                    size={36}
                    color={value <= rating ? "#f59e0b" : palette.subtle}
                  />
                </Pressable>
              ))}
            </View>
            <ThemedText style={[styles.ratingLabel, { color: palette.muted }]}>
              {rating === 5
                ? "Outstanding!"
                : rating === 4
                ? "Great experience"
                : rating === 3
                ? "It was okay"
                : rating === 2
                ? "Below expectations"
                : "Not recommended"}
            </ThemedText>
          </View>
        </View>

        {/* Photo */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
            PHOTO (OPTIONAL)
          </ThemedText>
          <Pressable
            onPress={() =>
              setPhotoUri((prev) => (prev ? "" : "dish_photo.jpg"))
            }
            style={({ pressed }) => [
              styles.photoBox,
              {
                borderColor: photoUri ? accent : palette.border,
                backgroundColor: photoUri ? accent + "08" : palette.inputBg,
              },
              pressed && { opacity: 0.9 },
            ]}
          >
            {photoUri ? (
              <View style={styles.photoFilled}>
                <View
                  style={[
                    styles.photoThumb,
                    { backgroundColor: accent + "20" },
                  ]}
                >
                  <IconSymbol name="checkmark" color={accent} size={24} />
                </View>
                <ThemedText style={[styles.photoName, { color: accent }]}>
                  {photoUri}
                </ThemedText>
                <ThemedText
                  style={[styles.photoHint, { color: palette.muted }]}
                >
                  Tap to remove
                </ThemedText>
              </View>
            ) : (
              <View style={styles.photoEmpty}>
                <View
                  style={[
                    styles.photoIconBg,
                    { backgroundColor: palette.surface },
                  ]}
                >
                  <IconSymbol name="paperplane.fill" color={accent} size={22} />
                </View>
                <ThemedText style={[styles.photoLabel, { color: accent }]}>
                  Add a photo
                </ThemedText>
                <ThemedText
                  style={[styles.photoHint, { color: palette.muted }]}
                >
                  Tap to attach
                </ThemedText>
              </View>
            )}
          </Pressable>
        </View>

        {/* Quick Tags */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
            QUICK TAGS
          </ThemedText>
          <View style={styles.tagsWrap}>
            {quickTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <Pressable
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={({ pressed }) => [
                    styles.tag,
                    {
                      backgroundColor: active ? accent + "18" : palette.surface,
                      borderColor: active ? accent : palette.border,
                    },
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.tagText,
                      { color: active ? accent : palette.muted },
                    ]}
                  >
                    {tag}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
            NOTES (OPTIONAL)
          </ThemedText>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            placeholder="What stood out? Taste, service, ambience..."
            placeholderTextColor={palette.muted}
            style={[
              styles.textArea,
              {
                borderColor: palette.border,
                backgroundColor: palette.inputBg,
                color: Colors[colorScheme ?? "light"].text,
              },
            ]}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.buttonArea}>
        <Pressable
          style={({ pressed }) => [
            styles.submitBtn,
            { backgroundColor: accent },
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
        >
          <IconSymbol name="star.fill" size={18} color="#fff" />
          <ThemedText style={styles.submitText}>Submit rating</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingTop: 52,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 20,
  },
  headerSub: {
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  suggestionList: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  placeIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 1,
  },
  placeDetail: {
    fontSize: 12,
  },
  ratingCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  starBtn: {
    padding: 2,
  },
  ratingLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  photoBox: {
    borderWidth: 1,
    borderRadius: 14,
    borderStyle: "dashed",
    padding: 20,
    alignItems: "center",
  },
  photoEmpty: {
    alignItems: "center",
  },
  photoFilled: {
    alignItems: "center",
  },
  photoIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  photoThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  photoLabel: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  photoName: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  photoHint: {
    fontSize: 12,
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontWeight: "600",
    fontSize: 13,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  buttonArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
