import React, { useMemo, useState } from "react";
import {
  Modal,
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

const mockGroups = [
  {
    name: "Weekend Foodies",
    members: ["Sam", "Mina", "Chris", "Ava"],
    focus: "Comfort picks · <$30 · 2 mi · medium spice",
    lastRestaurant: "Shoyu Lab",
    mode: "Explore",
  },
  {
    name: "Tuesday Lunch Crew",
    members: ["Alex", "Priya"],
    focus: "Fast-casual · <$20 · walkable · veg-friendly",
    lastRestaurant: "Cedar Mezze",
    mode: "Safety-first",
  },
  {
    name: "Family Dinner",
    members: ["Mom", "Dad", "Lina"],
    focus: "Cozy · kid-friendly · 5 mi · low spice",
    lastRestaurant: "Trattoria Rosa",
    mode: "Balanced",
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors[colorScheme ?? "light"].tint;
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [draftMembers, setDraftMembers] = useState<string[]>(["You"]);

  const { cardBackground, borderColor, mutedText } = useMemo(() => {
    const isDark = colorScheme === "dark";
    return {
      cardBackground: isDark ? "#1c1f24" : "#f6f7fb",
      borderColor: isDark ? "#2d3137" : "#e6e8ec",
      mutedText: isDark ? "#9ea7b3" : "#5b6472",
    };
  }, [colorScheme]);

  const handleAddMember = () => {
    const trimmed = newMember.trim();
    if (!trimmed) return;
    setDraftMembers((prev) => [...prev, trimmed]);
    setNewMember("");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headingRow}>
          <ThemedText type="title">Groups</ThemedText>
        </View>

        {mockGroups.map((group) => (
          <Pressable
            key={group.name}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: cardBackground,
                borderColor,
              },
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.cardHeader}>
              <ThemedText type="subtitle">{group.name}</ThemedText>
              <View style={[styles.pill, { backgroundColor: accent + "1a" }]}>
                <ThemedText style={[styles.pillText, { color: accent }]}>
                  {group.mode}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={[styles.muted, { color: mutedText }]}>
              {group.focus}
            </ThemedText>
            <View style={[styles.divider, { backgroundColor: borderColor }]} />
            <View style={styles.membersRow}>
              <View style={styles.avatarRow}>
                {group.members.map((member) => (
                  <View
                    key={member}
                    style={[
                      styles.avatar,
                      {
                        borderColor,
                        backgroundColor:
                          colorScheme === "dark" ? "#262a31" : "#fff",
                      },
                    ]}
                  >
                    <ThemedText style={styles.avatarText}>
                      {member.charAt(0)}
                    </ThemedText>
                  </View>
                ))}
              </View>
              <View style={styles.metaBlock}>
                <ThemedText style={styles.metaLabel}>Last pick</ThemedText>
                <View style={styles.lastPickRow}>
                  <IconSymbol name="book.fill" size={16} color={mutedText} />
                  <ThemedText style={[styles.metaValue, { color: mutedText }]}>
                    {group.lastRestaurant}
                  </ThemedText>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() => setShowModal(true)}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: accent },
          pressed && { opacity: 0.9 },
        ]}
      >
        <IconSymbol name="sparkles" color="#fff" size={22} />
        <ThemedText style={styles.fabText}>New group</ThemedText>
      </Pressable>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
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
            <ThemedText type="subtitle" style={styles.modalTitle}>
              Create a group
            </ThemedText>

            <ThemedText style={styles.label}>Group name</ThemedText>
            <TextInput
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholder="Brunch crew"
              placeholderTextColor={mutedText}
              style={[
                styles.input,
                { borderColor, color: Colors[colorScheme ?? "light"].text },
              ]}
            />

            <ThemedText style={styles.label}>Add people</ThemedText>
            <View style={[styles.chipRow, { borderColor }]}>
              {draftMembers.map((member) => (
                <View
                  key={member}
                  style={[styles.chip, { backgroundColor: accent + "12" }]}
                >
                  <ThemedText style={[styles.chipText, { color: accent }]}>
                    {member}
                  </ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.inlineRow}>
              <TextInput
                value={newMember}
                onChangeText={setNewMember}
                placeholder="Name or handle"
                placeholderTextColor={mutedText}
                style={[
                  styles.input,
                  styles.flex1,
                  { borderColor, color: Colors[colorScheme ?? "light"].text },
                ]}
              />
              <Pressable
                onPress={handleAddMember}
                style={({ pressed }) => [
                  styles.addButton,
                  { backgroundColor: accent },
                  pressed && { opacity: 0.9 },
                ]}
              >
                <ThemedText style={styles.addButtonText}>Add</ThemedText>
              </Pressable>
            </View>

            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setShowModal(false)}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  { borderColor },
                  pressed && { opacity: 0.85 },
                ]}
              >
                <ThemedText
                  style={[styles.secondaryText, { color: mutedText }]}
                >
                  Cancel
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => setShowModal(false)}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: accent },
                  pressed && { opacity: 0.9 },
                ]}
              >
                <ThemedText style={styles.primaryText}>Save</ThemedText>
              </Pressable>
            </View>
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
    paddingBottom: 120,
  },
  headingRow: {
    marginBottom: 12,
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
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 6,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  muted: {
    fontSize: 15,
    marginBottom: 4,
  },
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  avatarRow: {
    flexDirection: "row",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  avatarText: {
    fontWeight: "600",
    fontSize: 13,
  },
  metaBlock: {
    alignItems: "flex-end",
  },
  lastPickRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  metaValue: {
    marginTop: 2,
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
  modalTitle: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontWeight: "600",
    fontSize: 13,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  secondaryText: {
    fontWeight: "700",
    fontSize: 14,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
