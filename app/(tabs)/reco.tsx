import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

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

export default function RecommendationsScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors[colorScheme ?? "light"].tint;
  const [activeGroup, setActiveGroup] = useState<Group>(mockGroups[0]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    mockGroups[0].members
  );

  const { cardBackground, borderColor, mutedText } = useMemo(() => {
    const isDark = colorScheme === "dark";
    return {
      cardBackground: isDark ? "#1c1f24" : "#f6f7fb",
      borderColor: isDark ? "#2d3137" : "#e6e8ec",
      mutedText: isDark ? "#9ea7b3" : "#5b6472",
    };
  }, [colorScheme]);

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

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={styles.heading}>
          Suggest
        </ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupScroll}
        >
          {mockGroups.map((group) => {
            const selected = activeGroup.name === group.name;
            return (
              <Pressable
                key={group.name}
                onPress={() => handleSelectGroup(group)}
                style={({ pressed }) => [
                  styles.groupCard,
                  {
                    borderColor: selected ? accent : borderColor,
                    backgroundColor: selected ? accent + "15" : cardBackground,
                    borderWidth: selected ? 2 : 1,
                  },
                  pressed && styles.groupCardPressed,
                ]}
              >
                <View style={styles.groupCardContent}>
                  <View
                    style={[
                      styles.groupIconCircle,
                      {
                        backgroundColor: selected
                          ? accent + "25"
                          : colorScheme === "dark"
                          ? "#2d3137"
                          : "#e6e8ec",
                      },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.groupIconText,
                        { color: selected ? accent : mutedText },
                      ]}
                    >
                      {group.name.charAt(0)}
                    </ThemedText>
                  </View>
                  <ThemedText
                    style={[
                      styles.groupName,
                      { color: selected ? accent : undefined },
                    ]}
                  >
                    {group.name}
                  </ThemedText>
                  <ThemedText
                    style={[styles.groupConstraints, { color: mutedText }]}
                    numberOfLines={2}
                  >
                    {group.constraints}
                  </ThemedText>
                  <View
                    style={[
                      styles.modeTag,
                      {
                        backgroundColor: selected
                          ? accent + "20"
                          : colorScheme === "dark"
                          ? "#262a31"
                          : "#f0f0f0",
                      },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.modeTagText,
                        { color: selected ? accent : mutedText },
                      ]}
                    >
                      {group.mood}
                    </ThemedText>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.membersSection}>
          <ThemedText style={styles.sectionLabel}>
            Members ({selectedMembers.length}/{activeGroup.members.length})
          </ThemedText>
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
                    pressed && styles.memberItemPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.memberAvatar,
                      {
                        borderColor: picked ? accent : borderColor,
                        backgroundColor: picked
                          ? accent + "20"
                          : colorScheme === "dark"
                          ? "#262a31"
                          : "#fff",
                        borderWidth: picked ? 2.5 : 1.5,
                      },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.memberAvatarText,
                        { color: picked ? accent : mutedText },
                      ]}
                    >
                      {member.charAt(0)}
                    </ThemedText>
                    {picked && (
                      <View
                        style={[
                          styles.memberCheck,
                          {
                            backgroundColor: accent,
                            borderColor: cardBackground,
                          },
                        ]}
                      >
                        <IconSymbol name="checkmark" color="#fff" size={10} />
                      </View>
                    )}
                  </View>
                  <ThemedText
                    style={[
                      styles.memberLabel,
                      {
                        color: picked ? accent : mutedText,
                        fontWeight: picked ? "700" : "500",
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

        <Pressable
          onPress={() => {
            // Here you would trigger the suggestion generation
          }}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <View style={[styles.buttonGradient, { backgroundColor: accent }]}>
            <IconSymbol name="sparkles" color="#fff" size={20} />
            <ThemedText style={[styles.primaryText, { marginLeft: 8 }]}>
              Generate suggestion
            </ThemedText>
          </View>
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
    marginBottom: 16,
  },
  groupScroll: {
    paddingRight: 16,
    marginBottom: 20,
  },
  groupCard: {
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    width: 180,
    minHeight: 160,
  },
  groupCardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  groupCardContent: {
    alignItems: "center",
  },
  groupIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  groupIconText: {
    fontWeight: "800",
    fontSize: 24,
  },
  groupName: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 6,
    textAlign: "center",
  },
  groupConstraints: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 16,
  },
  modeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modeTagText: {
    fontWeight: "600",
    fontSize: 11,
  },
  membersSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 12,
  },
  memberScroll: {
    paddingRight: 16,
  },
  memberItem: {
    alignItems: "center",
    marginRight: 16,
    width: 70,
  },
  memberItemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    position: "relative",
  },
  memberAvatarText: {
    fontWeight: "700",
    fontSize: 22,
  },
  memberCheck: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
  },
  memberLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  primaryButton: {
    borderRadius: 14,
    marginTop: 8,
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 14,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.2,
  },
  primaryHint: {
    textAlign: "center",
    color: "#e0f2ff",
    fontSize: 12,
    marginTop: 6,
    paddingHorizontal: 4,
  },
});
