import React, { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

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
  const [showSelector, setShowSelector] = useState(false);
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

        <Pressable
          onPress={() => setShowSelector(true)}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: accent },
            pressed && { opacity: 0.9 },
          ]}
        >
          <View style={styles.primaryContent}>
            <IconSymbol name="sparkles" color="#fff" size={22} />
            <ThemedText style={styles.primaryText}>
              Generate suggestion
            </ThemedText>
          </View>
          <ThemedText style={styles.primaryHint}>
            Not live yet — this is the shape of the flow.
          </ThemedText>
        </Pressable>
      </ScrollView>

      <Modal
        visible={showSelector}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSelector(false)}
      >
        <View style={styles.modalBackdrop}>
          <ThemedView
            style={[
              styles.modalCard,
              {
                backgroundColor: colorScheme === "dark" ? "#111418" : "#fff",
                borderColor,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle">Select group</ThemedText>
              <Pressable onPress={() => setShowSelector(false)}>
                <IconSymbol name="chevron.right" size={24} color={mutedText} />
              </Pressable>
            </View>

            {mockGroups.map((group) => {
              const selected = activeGroup.name === group.name;
              return (
                <Pressable
                  key={group.name}
                  onPress={() => handleSelectGroup(group)}
                  style={({ pressed }) => [
                    styles.groupOption,
                    {
                      borderColor,
                      backgroundColor: selected ? accent + "12" : undefined,
                    },
                    pressed && { opacity: 0.88 },
                  ]}
                >
                  <View>
                    <ThemedText style={styles.optionTitle}>
                      {group.name}
                    </ThemedText>
                    <ThemedText
                      style={[styles.optionCaption, { color: mutedText }]}
                    >
                      {group.constraints}
                    </ThemedText>
                  </View>
                  {selected && (
                    <View
                      style={[styles.pill, { backgroundColor: accent + "1a" }]}
                    >
                      <ThemedText style={[styles.pillText, { color: accent }]}>
                        Active
                      </ThemedText>
                    </View>
                  )}
                </Pressable>
              );
            })}

            <ThemedText style={styles.label}>Members included</ThemedText>
            <View style={styles.memberGrid}>
              {activeGroup.members.map((member) => {
                const picked = selectedMembers.includes(member);
                return (
                  <Pressable
                    key={member}
                    onPress={() => toggleMember(member)}
                    style={({ pressed }) => [
                      styles.memberChip,
                      {
                        borderColor,
                        backgroundColor: picked ? accent + "12" : undefined,
                      },
                      pressed && { opacity: 0.88 },
                    ]}
                  >
                    <ThemedText style={styles.memberInitial}>
                      {member.charAt(0)}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.memberName,
                        { color: picked ? accent : mutedText },
                      ]}
                    >
                      {member}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => {
                setShowSelector(false);
                // Here you would trigger the suggestion generation
              }}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: accent, marginTop: 12 },
                pressed && { opacity: 0.9 },
              ]}
            >
              <ThemedText style={styles.primaryText}>
                Generate suggestion
              </ThemedText>
            </Pressable>
          </ThemedView>
        </View>
      </Modal>
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
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginRight: 6,
  },
  pillText: {
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 6,
    fontSize: 14,
  },
  memberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  memberChip: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: "center",
    width: "46%",
  },
  memberInitial: {
    fontWeight: "700",
    marginBottom: 3,
    fontSize: 13,
  },
  memberName: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  primaryButton: {
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  primaryContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
    lineHeight: 20,
  },
  primaryHint: {
    textAlign: "center",
    color: "#e0f2ff",
    fontSize: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalCard: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  groupOption: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTitle: {
    fontWeight: "700",
    marginBottom: 3,
    fontSize: 14,
    lineHeight: 20,
  },
  optionCaption: {
    fontSize: 13,
    lineHeight: 18,
  },
});
