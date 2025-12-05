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

const modeColors: Record<string, string> = {
  Explore: "#10b981",
  "Safety-first": "#f59e0b",
  Balanced: "#6366f1",
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const accent = Colors[colorScheme ?? "light"].tint;
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [draftMembers, setDraftMembers] = useState<string[]>(["You"]);

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

  const handleAddMember = () => {
    const trimmed = newMember.trim();
    if (!trimmed) return;
    setDraftMembers((prev) => [...prev, trimmed]);
    setNewMember("");
  };

  const resetModal = () => {
    setShowModal(false);
    setNewGroupName("");
    setNewMember("");
    setDraftMembers(["You"]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Groups</ThemedText>
          <View style={[styles.countBadge, { backgroundColor: accent + "18" }]}>
            <ThemedText style={[styles.countText, { color: accent }]}>
              {mockGroups.length}
            </ThemedText>
          </View>
        </View>

        {/* Group Cards */}
        {mockGroups.map((group) => {
          const modeColor = modeColors[group.mode] || accent;
          return (
            <Pressable
              key={group.name}
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
                <View
                  style={[
                    styles.groupIcon,
                    { backgroundColor: modeColor + "18" },
                  ]}
                >
                  <ThemedText
                    style={[styles.groupIconText, { color: modeColor }]}
                  >
                    {group.name.charAt(0)}
                  </ThemedText>
                </View>
                <View style={styles.cardTitleArea}>
                  <ThemedText style={styles.cardTitle}>{group.name}</ThemedText>
                  <View
                    style={[
                      styles.modePill,
                      { backgroundColor: modeColor + "14" },
                    ]}
                  >
                    <View
                      style={[styles.modeDot, { backgroundColor: modeColor }]}
                    />
                    <ThemedText style={[styles.modeText, { color: modeColor }]}>
                      {group.mode}
                    </ThemedText>
                  </View>
                </View>
              </View>

              {/* Focus/Constraints */}
              <ThemedText style={[styles.focus, { color: palette.muted }]}>
                {group.focus}
              </ThemedText>

              {/* Footer: Avatars + Last Pick */}
              <View
                style={[styles.cardFooter, { borderTopColor: palette.subtle }]}
              >
                <View style={styles.avatarStack}>
                  {group.members.slice(0, 4).map((member, i) => (
                    <View
                      key={member}
                      style={[
                        styles.avatar,
                        {
                          backgroundColor: isDark ? "#2d3238" : "#e8ecf1",
                          borderColor: palette.surfaceAlt,
                          marginLeft: i > 0 ? -8 : 0,
                          zIndex: group.members.length - i,
                        },
                      ]}
                    >
                      <ThemedText
                        style={[styles.avatarText, { color: palette.muted }]}
                      >
                        {member.charAt(0)}
                      </ThemedText>
                    </View>
                  ))}
                  {group.members.length > 4 && (
                    <View
                      style={[
                        styles.avatar,
                        styles.avatarMore,
                        {
                          backgroundColor: accent + "18",
                          borderColor: palette.surfaceAlt,
                          marginLeft: -8,
                        },
                      ]}
                    >
                      <ThemedText
                        style={[styles.avatarText, { color: accent }]}
                      >
                        +{group.members.length - 4}
                      </ThemedText>
                    </View>
                  )}
                </View>
                <View style={styles.lastPick}>
                  <IconSymbol
                    name="book.fill"
                    size={12}
                    color={palette.muted}
                  />
                  <ThemedText
                    style={[styles.lastPickText, { color: palette.muted }]}
                  >
                    {group.lastRestaurant}
                  </ThemedText>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => setShowModal(true)}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: accent },
          pressed && { opacity: 0.9, transform: [{ scale: 0.96 }] },
        ]}
      >
        <IconSymbol name="sparkles" color="#fff" size={18} />
        <ThemedText style={styles.fabText}>New group</ThemedText>
      </Pressable>

      {/* Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={resetModal}
      >
        <Pressable style={styles.backdrop} onPress={resetModal}>
          <Pressable
            style={[
              styles.sheet,
              { backgroundColor: isDark ? "#111418" : "#fff" },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <View style={styles.handleRow}>
              <View
                style={[styles.handle, { backgroundColor: palette.subtle }]}
              />
            </View>

            <ThemedText type="subtitle" style={styles.sheetTitle}>
              Create a group
            </ThemedText>

            {/* Name Input */}
            <ThemedText style={[styles.label, { color: palette.muted }]}>
              GROUP NAME
            </ThemedText>
            <TextInput
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholder="Brunch crew"
              placeholderTextColor={palette.muted}
              style={[
                styles.input,
                {
                  borderColor: palette.border,
                  backgroundColor: palette.inputBg,
                  color: Colors[colorScheme ?? "light"].text,
                },
              ]}
            />

            {/* Members */}
            <ThemedText style={[styles.label, { color: palette.muted }]}>
              MEMBERS
            </ThemedText>
            <View style={styles.chipWrap}>
              {draftMembers.map((member) => (
                <View
                  key={member}
                  style={[styles.chip, { backgroundColor: accent + "14" }]}
                >
                  <ThemedText style={[styles.chipText, { color: accent }]}>
                    {member}
                  </ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.addRow}>
              <TextInput
                value={newMember}
                onChangeText={setNewMember}
                placeholder="Name or handle"
                placeholderTextColor={palette.muted}
                style={[
                  styles.input,
                  styles.flex1,
                  {
                    borderColor: palette.border,
                    backgroundColor: palette.inputBg,
                    color: Colors[colorScheme ?? "light"].text,
                    marginBottom: 0,
                  },
                ]}
              />
              <Pressable
                onPress={handleAddMember}
                style={({ pressed }) => [
                  styles.addBtn,
                  { backgroundColor: accent },
                  pressed && { opacity: 0.9 },
                ]}
              >
                <ThemedText style={styles.addBtnText}>Add</ThemedText>
              </Pressable>
            </View>

            {/* Actions */}
            <View style={styles.sheetActions}>
              <Pressable
                onPress={resetModal}
                style={({ pressed }) => [
                  styles.cancelBtn,
                  { borderColor: palette.border },
                  pressed && { opacity: 0.85 },
                ]}
              >
                <ThemedText
                  style={[styles.cancelText, { color: palette.muted }]}
                >
                  Cancel
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={resetModal}
                style={({ pressed }) => [
                  styles.saveBtn,
                  { backgroundColor: accent },
                  pressed && { opacity: 0.9 },
                ]}
              >
                <ThemedText style={styles.saveText}>Create group</ThemedText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    gap: 8,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 13,
    fontWeight: "700",
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  groupIconText: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardTitleArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  modePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
  },
  modeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  modeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  focus: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  avatarMore: {},
  avatarText: {
    fontSize: 10,
    fontWeight: "600",
  },
  lastPick: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  lastPickText: {
    fontSize: 11,
    fontWeight: "500",
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
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 32,
  },
  handleRow: {
    alignItems: "center",
    marginBottom: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  sheetTitle: {
    marginBottom: 16,
    fontSize: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 14,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  chip: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipText: {
    fontWeight: "600",
    fontSize: 13,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  flex1: {
    flex: 1,
  },
  addBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  sheetActions: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "600",
    fontSize: 14,
  },
  saveBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
