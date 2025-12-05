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

export default function ReviewsScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors[colorScheme ?? "light"].tint;
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof mockPlaces)[0] | null
  >(null);
  const [rating, setRating] = useState(4);
  const [notes, setNotes] = useState(
    "Loved the broth, service was quick, spice was just right."
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [photoUri, setPhotoUri] = useState("");

  const { cardBackground, borderColor, mutedText, inputBg } = useMemo(() => {
    const isDark = colorScheme === "dark";
    return {
      cardBackground: isDark ? "#1c1f24" : "#f6f7fb",
      borderColor: isDark ? "#2d3137" : "#e6e8ec",
      mutedText: isDark ? "#9ea7b3" : "#5b6472",
      inputBg: isDark ? "#0f1115" : "#fff",
    };
  }, [colorScheme]);

  const filteredPlaces = searchQuery
    ? mockPlaces.filter((place) =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={styles.heading}>
          Rate
        </ThemedText>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Location</ThemedText>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for a place"
            placeholderTextColor={mutedText}
            style={[
              styles.input,
              {
                borderColor,
                backgroundColor: inputBg,
                color: Colors[colorScheme ?? "light"].text,
              },
            ]}
          />
          <View style={[styles.suggestionList, { borderColor }]}>
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => {
                const selected = selectedLocation?.name === place.name;
                return (
                  <Pressable
                    key={place.name}
                    onPress={() => setSelectedLocation(place)}
                    style={({ pressed }) => [
                      styles.suggestion,
                      {
                        backgroundColor: selected ? accent + "12" : undefined,
                      },
                      pressed && { opacity: 0.88 },
                    ]}
                  >
                    <View>
                      <ThemedText style={styles.optionTitle}>
                        {place.name}
                      </ThemedText>
                      <ThemedText
                        style={[styles.optionCaption, { color: mutedText }]}
                      >
                        {place.detail}
                      </ThemedText>
                    </View>
                    {selected && (
                      <IconSymbol
                        name="chevron.right"
                        size={18}
                        color={accent}
                      />
                    )}
                  </Pressable>
                );
              })
            ) : (
              <ThemedText
                style={[
                  styles.optionCaption,
                  { color: mutedText, paddingHorizontal: 4 },
                ]}
              >
                Type to search and select a spot.
              </ThemedText>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Photo</ThemedText>
          <Pressable
            onPress={() =>
              setPhotoUri((prev) => (prev ? "" : "dining_room.jpg"))
            }
            style={({ pressed }) => [
              styles.photoSquare,
              {
                borderColor,
                backgroundColor: photoUri ? accent + "12" : inputBg,
              },
              pressed && { opacity: 0.9 },
            ]}
          >
            {photoUri ? (
              <View style={styles.photoFilled}>
                <IconSymbol name="paperplane.fill" color={accent} size={24} />
                <ThemedText style={[styles.photoText, { color: accent }]}>
                  {photoUri}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.photoEmpty}>
                <IconSymbol name="paperplane.fill" color={accent} size={26} />
                <ThemedText style={[styles.photoText, { color: accent }]}>
                  Add image
                </ThemedText>
                <ThemedText
                  style={[styles.optionCaption, { color: mutedText }]}
                >
                  Press to attach
                </ThemedText>
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Overall rating</ThemedText>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Pressable
                key={value}
                onPress={() => setRating(value)}
                style={({ pressed }) => [
                  styles.starButton,
                  pressed && { transform: [{ scale: 0.96 }] },
                ]}
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
                color: Colors[colorScheme ?? "light"].text,
              },
            ]}
          />
          <View style={styles.tagRow}>
            {["Service", "Spice level", "Ambience", "Price"].map((tag) => (
              <View
                key={tag}
                style={[styles.tag, { backgroundColor: accent + "12" }]}
              >
                <ThemedText style={[styles.tagText, { color: accent }]}>
                  {tag}
                </ThemedText>
              </View>
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
    padding: 16,
    paddingTop: 44,
    paddingBottom: 80,
  },
  heading: {
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    marginBottom: 6,
  },
  suggestionList: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
    marginBottom: 6,
  },
  suggestion: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTitle: {
    fontWeight: "700",
    marginBottom: 4,
    fontSize: 15,
    lineHeight: 20,
  },
  optionCaption: {
    fontSize: 14,
    lineHeight: 18,
  },
  photoSquare: {
    width: "100%",
    height: 160,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  photoEmpty: {
    alignItems: "center",
  },
  photoFilled: {
    alignItems: "center",
  },
  photoText: {
    fontWeight: "700",
    marginTop: 4,
    fontSize: 15,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: "top",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontWeight: "700",
    fontSize: 13,
  },
  starsRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  starButton: {
    marginRight: 5,
  },
  primaryButton: {
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 3,
    fontSize: 14,
  },
  primaryHint: {
    color: "#e0f2ff",
    fontSize: 12,
    textAlign: "center",
  },
});
