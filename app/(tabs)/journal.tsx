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
    tags: ["Perfect Fit", "Veg options"],
    rating: 5,
    date: "Sun, Dec 1",
    time: "8:30 PM",
    distance: "1.2 mi",
  },
  {
    name: "Cedar Mezze",
    group: "Tuesday Lunch Crew",
    notes: "Fast service, good shareables, terrace seating.",
    tags: ["Safe Pick", "Outdoor"],
    rating: 4,
    date: "Tue, Nov 26",
    time: "12:10 PM",
    distance: "0.6 mi",
  },
  {
    name: "Pizzeria Lola",
    group: "Family Dinner",
    notes: "Kid-friendly, dairy-free options, easy parking.",
    tags: ["Family", "Low spice"],
    rating: 4,
    date: "Fri, Nov 22",
    time: "6:45 PM",
    distance: "2.1 mi",
  },
];

const tagColors: Record<string, string> = {
  "Perfect Fit": "#10b981",
  "Safe Pick": "#6366f1",
  Family: "#f59e0b",
  Outdoor: "#0ea5e9",
  "Veg options": "#22c55e",
  "Low spice": "#f97316",
};

export default function ReviewHistoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const accent = Colors[colorScheme ?? "light"].tint;

  const palette = useMemo(
    () => ({
      surface: isDark ? "#1a1d21" : "#f8f9fb",
      surfaceAlt: isDark ? "#22262c" : "#fff",
      border: isDark ? "#2a2f36" : "#e8eaed",
      muted: isDark ? "#8b939e" : "#6b7280",
      subtle: isDark ? "#3a4049" : "#dfe2e6",
    }),
    [isDark]
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Journal</ThemedText>
          <View style={[styles.countBadge, { backgroundColor: accent + "18" }]}>
            <ThemedText style={[styles.countText, { color: accent }]}>
              {entries.length} visits
            </ThemedText>
          </View>
        </View>

        {/* Entry Cards */}
        {entries.map((entry, index) => (
          <Pressable
            key={entry.name + index}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: palette.surfaceAlt,
                borderColor: palette.border,
              },
              pressed && { opacity: 0.92, transform: [{ scale: 0.985 }] },
            ]}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <ThemedText style={styles.cardTitle}>{entry.name}</ThemedText>
                <View style={styles.metaRow}>
                  <IconSymbol
                    name="location.fill"
                    size={11}
                    color={palette.muted}
                  />
                  <ThemedText
                    style={[styles.metaText, { color: palette.muted }]}
                  >
                    {entry.distance}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.ratingBadge}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconSymbol
                    key={star}
                    name="star.fill"
                    size={14}
                    color={star <= entry.rating ? "#f59e0b" : palette.subtle}
                  />
                ))}
              </View>
            </View>

            {/* Date & Time */}
            <View
              style={[styles.dateRow, { backgroundColor: palette.surface }]}
            >
              <ThemedText style={[styles.dateText, { color: palette.muted }]}>
                {entry.date}
              </ThemedText>
              <View
                style={[styles.dateDot, { backgroundColor: palette.subtle }]}
              />
              <ThemedText style={[styles.dateText, { color: palette.muted }]}>
                {entry.time}
              </ThemedText>
            </View>

            {/* Notes */}
            <ThemedText style={styles.notes}>{entry.notes}</ThemedText>

            {/* Tags */}
            <View style={styles.tagsRow}>
              {entry.tags.map((tag) => {
                const tagColor = tagColors[tag] || accent;
                return (
                  <View
                    key={tag}
                    style={[styles.tag, { backgroundColor: tagColor + "14" }]}
                  >
                    <ThemedText style={[styles.tagText, { color: tagColor }]}>
                      {tag}
                    </ThemedText>
                  </View>
                );
              })}
            </View>

            {/* Footer: Group */}
            <View
              style={[styles.cardFooter, { borderTopColor: palette.subtle }]}
            >
              <View
                style={[styles.groupPill, { backgroundColor: accent + "12" }]}
              >
                <IconSymbol name="person.2.fill" size={12} color={accent} />
                <ThemedText style={[styles.groupText, { color: accent }]}>
                  {entry.group}
                </ThemedText>
              </View>
              <IconSymbol
                name="chevron.right"
                size={14}
                color={palette.muted}
              />
            </View>
          </Pressable>
        ))}

        {/* Empty state hint */}
        <View style={styles.hintArea}>
          <ThemedText style={[styles.hintText, { color: palette.muted }]}>
            Rate more places to build your journal
          </ThemedText>
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => {
          // Navigate to rate screen
        }}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: accent },
          pressed && { opacity: 0.9, transform: [{ scale: 0.96 }] },
        ]}
      >
        <IconSymbol name="star.fill" color="#fff" size={18} />
        <ThemedText style={styles.fabText}>New rating</ThemedText>
      </Pressable>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    fontSize: 11,
  },
  ratingBadge: {
    flexDirection: "row",
    gap: 2,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 10,
    gap: 6,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "500",
  },
  dateDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  notes: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontWeight: "600",
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
  },
  groupPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
  },
  groupText: {
    fontWeight: "600",
    fontSize: 12,
  },
  hintArea: {
    alignItems: "center",
    paddingVertical: 20,
  },
  hintText: {
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
