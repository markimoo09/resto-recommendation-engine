import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const entries = [
  {
    name: "Shoyu Lab",
    group: "Weekend Foodies",
    notes: "Warm broth, veg options, quiet enough to chat.",
    tags: ["Perfect Fit", "Veg options", "<$25"],
    rating: 5,
    meta: "Sun · 8:30 PM · 1.2 mi",
  },
  {
    name: "Cedar Mezze",
    group: "Tuesday Lunch Crew",
    notes: "Fast service, good shareables, terrace seating.",
    tags: ["Safe", "Outdoor", "Quick"],
    rating: 4,
    meta: "Tue · 12:10 PM · 0.6 mi",
  },
  {
    name: "Pizzeria Lola",
    group: "Family Dinner",
    notes: "Kid-friendly, dairy-free options, easy parking.",
    tags: ["Family", "Low spice", "Parking"],
    rating: 4,
    meta: "Fri · 6:45 PM · 2.1 mi",
  },
];

export default function ReviewHistoryScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors[colorScheme ?? "light"].tint;

  const { cardBackground, borderColor, mutedText } = useMemo(() => {
    const isDark = colorScheme === "dark";
    return {
      cardBackground: isDark ? "#1c1f24" : "#f6f7fb",
      borderColor: isDark ? "#2d3137" : "#e6e8ec",
      mutedText: isDark ? "#9ea7b3" : "#5b6472",
    };
  }, [colorScheme]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.heading}>
          Journal
        </ThemedText>

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

            <View style={styles.footerRow}>
              <View style={[styles.pill, { backgroundColor: accent + "1a" }]}>
                <ThemedText style={[styles.pillText, { color: accent }]}>
                  {entry.group}
                </ThemedText>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() => {
          // Navigate to review page or open rating modal
        }}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: accent },
          pressed && { opacity: 0.9 },
        ]}
      >
        <IconSymbol name="star.fill" color="#fff" size={22} />
        <ThemedText style={styles.fabText}>New rating</ThemedText>
      </Pressable>
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
    paddingBottom: 100,
  },
  heading: {
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  muted: {
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: "row",
  },
  note: {
    fontSize: 15,
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontWeight: "700",
    fontSize: 13,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  pillText: {
    fontWeight: "600",
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 26,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  fabText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
});
