import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { postFoo } from "@/api/client";

type Group = {
  name: string;
  members: string[];
  constraints: string;
  mood: string;
};

const mockGroups: Group[] = [
  {
    name: "Weekend Foodies",
    members: ["Sam", "Mina", "Chris", "Ava"],
    constraints: "Veg-friendly · med spice · <$30 · 2 mi",
    mood: "Explore",
  },
  {
    name: "Tuesday Lunch Crew",
    members: ["Alex", "Priya"],
    constraints: "Quick lunch · <$20 · walkable",
    mood: "Safety-first",
  },
  {
    name: "Family Dinner",
    members: ["Mom", "Dad", "Lina"],
    constraints: "Low spice · cozy · 5 mi",
    mood: "Balanced",
  },
];

const moodColors: Record<string, string> = {
  Explore: "#10b981",
  "Safety-first": "#f59e0b",
  Balanced: "#6366f1",
};

export default function RecommendationsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const accent = Colors[colorScheme ?? "light"].tint;
  const [activeGroup, setActiveGroup] = useState<Group>(mockGroups[0]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    mockGroups[0].members
  );
	  const [isGenerating, setIsGenerating] = useState(false);
	  const [demoResult, setDemoResult] = useState<string | null>(null);

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

  const toggleMember = (member: string) => {
    setSelectedMembers((prev) => {
      if (prev.includes(member)) {
        return prev.filter((item) => item !== member);
      }
      return [...prev, member];
    });
  };

  const handleSelectGroup = (group: Group) => {
    setActiveGroup(group);
    setSelectedMembers(group.members);
  };

	  const handleGenerateSuggestions = async () => {
	    try {
	      setIsGenerating(true);
	      setDemoResult(null);
	      // Demo call to the typed FastAPI backend. Once the backend is
	      // running (uvicorn backend.backend.main:app), this will hit
	      // POST /foo with a fully type-checked payload and response.
	      const result = await postFoo({ foo: activeGroup.name });
	      const first = result[0];
	      if (first) {
	        setDemoResult(first.bar);
	      }
	    } catch (error) {
	      console.error("Failed to generate suggestions", error);
	    } finally {
	      setIsGenerating(false);
	    }
	  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Suggest</ThemedText>
          <ThemedText style={[styles.headerSub, { color: palette.muted }]}>
            Pick a group to get recommendations
          </ThemedText>
        </View>

        {/* Group Selector */}
        <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
          SELECT GROUP
        </ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupScroll}
        >
          {mockGroups.map((group) => {
            const selected = activeGroup.name === group.name;
            const moodColor = moodColors[group.mood] || accent;
            return (
              <Pressable
                key={group.name}
                onPress={() => handleSelectGroup(group)}
                style={({ pressed }) => [
                  styles.groupCard,
                  {
                    borderColor: selected ? moodColor : palette.border,
                    backgroundColor: selected
                      ? moodColor + "0c"
                      : palette.surfaceAlt,
                    borderWidth: selected ? 2 : 1,
                  },
                  pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] },
                ]}
              >
                {/* Group Icon */}
                <View
                  style={[
                    styles.groupIcon,
                    {
                      backgroundColor: selected
                        ? moodColor + "20"
                        : palette.surface,
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.groupIconText,
                      { color: selected ? moodColor : palette.muted },
                    ]}
                  >
                    {group.name.charAt(0)}
                  </ThemedText>
                </View>

                {/* Group Info */}
                <ThemedText
                  style={[styles.groupName, selected && { color: moodColor }]}
                  numberOfLines={1}
                >
                  {group.name}
                </ThemedText>
                <ThemedText
                  style={[styles.groupConstraints, { color: palette.muted }]}
                  numberOfLines={2}
                >
                  {group.constraints}
                </ThemedText>

                {/* Mood Tag */}
                <View
                  style={[
                    styles.moodTag,
                    {
                      backgroundColor: selected
                        ? moodColor + "1a"
                        : palette.surface,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.moodDot,
                      { backgroundColor: selected ? moodColor : palette.muted },
                    ]}
                  />
                  <ThemedText
                    style={[
                      styles.moodText,
                      { color: selected ? moodColor : palette.muted },
                    ]}
                  >
                    {group.mood}
                  </ThemedText>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Members Section */}
        <View style={styles.membersSection}>
          <View style={styles.membersHeader}>
	            <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
	              WHO&apos;S COMING
	            </ThemedText>
            <View
              style={[styles.countPill, { backgroundColor: accent + "14" }]}
            >
              <ThemedText style={[styles.countText, { color: accent }]}>
                {selectedMembers.length}/{activeGroup.members.length}
              </ThemedText>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.memberScroll}
          >
            {activeGroup.members.map((member) => {
              const picked = selectedMembers.includes(member);
              return (
                <Pressable
                  key={member}
                  onPress={() => toggleMember(member)}
                  style={({ pressed }) => [
                    styles.memberItem,
                    pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] },
                  ]}
                >
                  <View
                    style={[
                      styles.memberAvatar,
                      {
                        borderColor: picked ? accent : palette.border,
                        backgroundColor: picked
                          ? accent + "14"
                          : palette.surface,
                        borderWidth: picked ? 2 : 1,
                      },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.memberAvatarText,
                        { color: picked ? accent : palette.muted },
                      ]}
                    >
                      {member.charAt(0)}
                    </ThemedText>
                    {picked && (
                      <View
                        style={[styles.checkBadge, { backgroundColor: accent }]}
                      >
                        <IconSymbol name="checkmark" color="#fff" size={10} />
                      </View>
                    )}
                  </View>
                  <ThemedText
                    style={[
                      styles.memberLabel,
                      {
                        color: picked ? accent : palette.muted,
                        fontWeight: picked ? "600" : "500",
                      },
                    ]}
                  >
                    {member}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Summary Card */}
        <View
          style={[
            styles.summaryCard,
            { backgroundColor: palette.surface, borderColor: palette.border },
          ]}
        >
          <View style={styles.summaryRow}>
            <View
              style={[styles.summaryIcon, { backgroundColor: accent + "14" }]}
            >
              <IconSymbol name="sparkles" size={16} color={accent} />
            </View>
            <View style={styles.summaryText}>
              <ThemedText style={styles.summaryTitle}>
                Ready to suggest
              </ThemedText>
              <ThemedText style={[styles.summarySub, { color: palette.muted }]}>
                {selectedMembers.length} member
	                {selectedMembers.length !== 1 ? "s" : ""} · {activeGroup.mood}{" "}
	                mode
	              </ThemedText>
	              {demoResult && (
	                <ThemedText
	                  style={[styles.summarySub, { color: palette.muted }]}
	                  numberOfLines={1}
	                >
	                  Backend echo: {demoResult}
	                </ThemedText>
	              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Generate Button */}
      <View style={styles.buttonArea}>
        <Pressable
	          onPress={handleGenerateSuggestions}
	          disabled={isGenerating}
          style={({ pressed }) => [
            styles.generateBtn,
	            { backgroundColor: accent, opacity: isGenerating ? 0.7 : 1 },
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
        >
          <IconSymbol name="sparkles" size={18} color="#fff" />
	          <ThemedText style={styles.generateText}>
	            {isGenerating ? "Generating..." : "Generate suggestions"}
	          </ThemedText>
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
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  groupScroll: {
    paddingRight: 16,
    marginBottom: 24,
  },
  groupCard: {
    borderRadius: 14,
    padding: 12,
    marginRight: 10,
    width: 150,
    minHeight: 140,
  },
  groupIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  groupIconText: {
    fontWeight: "700",
    fontSize: 18,
  },
  groupName: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  groupConstraints: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 10,
  },
  moodTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 5,
  },
  moodDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moodText: {
    fontWeight: "600",
    fontSize: 10,
  },
  membersSection: {
    marginBottom: 16,
  },
  membersHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  countText: {
    fontSize: 11,
    fontWeight: "700",
  },
  memberScroll: {
    paddingRight: 16,
  },
  memberItem: {
    alignItems: "center",
    marginRight: 14,
    width: 60,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    position: "relative",
  },
  memberAvatarText: {
    fontWeight: "700",
    fontSize: 18,
  },
  checkBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  memberLabel: {
    fontSize: 11,
    textAlign: "center",
  },
  summaryCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryText: {
    flex: 1,
  },
  summaryTitle: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  summarySub: {
    fontSize: 12,
  },
  buttonArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
  generateBtn: {
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
  generateText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
