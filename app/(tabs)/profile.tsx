import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const stats = [
  { label: "Groups", value: "3", icon: "person.2.fill" },
  { label: "Ratings", value: "18", icon: "star.fill" },
  { label: "Saved", value: "9", icon: "bookmark.fill" },
] as const;

const preferences = [
  { label: "Diet", value: "Pescatarian · dairy-light", icon: "leaf.fill" },
  {
    label: "Budget",
    value: "$30 casual · $55 dinner",
    icon: "creditcard.fill",
  },
  {
    label: "Distance",
    value: "3 mi weekday · 5 mi weekend",
    icon: "location.fill",
  },
  {
    label: "Ambience",
    value: "Quiet, cozy, low music",
    icon: "speaker.wave.1.fill",
  },
] as const;

const actions = [
  { label: "Edit profile", icon: "pencil" },
  { label: "Preferences", icon: "slider.horizontal.3" },
  { label: "Notifications", icon: "bell.fill" },
  { label: "Settings", icon: "gearshape.fill" },
] as const;

export default function ProfileScreen() {
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
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[styles.avatarRing, { borderColor: accent + "40" }]}>
            <View style={[styles.avatar, { backgroundColor: accent }]}>
              <ThemedText style={styles.avatarLetter}>M</ThemedText>
            </View>
          </View>
          <ThemedText type="subtitle" style={styles.name}>
            Morgan Lee
          </ThemedText>
          <ThemedText style={[styles.email, { color: palette.muted }]}>
            morgan@example.com
          </ThemedText>
        </View>

        {/* Stats Row */}
        <View
          style={[
            styles.statsRow,
            { backgroundColor: palette.surface, borderColor: palette.border },
          ]}
        >
          {stats.map((stat, i) => (
            <View
              key={stat.label}
              style={[
                styles.statItem,
                i < stats.length - 1 && {
                  borderRightWidth: 1,
                  borderRightColor: palette.border,
                },
              ]}
            >
              <IconSymbol name={stat.icon} size={14} color={accent} />
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: palette.muted }]}>
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Preferences */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: palette.surfaceAlt,
              borderColor: palette.border,
            },
          ]}
        >
          <ThemedText style={[styles.sectionLabel, { color: palette.muted }]}>
            Preferences
          </ThemedText>
          {preferences.map((pref, i) => (
            <View
              key={pref.label}
              style={[
                styles.prefRow,
                i < preferences.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: palette.subtle,
                },
              ]}
            >
              <View
                style={[styles.prefIcon, { backgroundColor: accent + "14" }]}
              >
                <IconSymbol name={pref.icon} size={14} color={accent} />
              </View>
              <View style={styles.prefText}>
                <ThemedText style={styles.prefLabel}>{pref.label}</ThemedText>
                <ThemedText
                  style={[styles.prefValue, { color: palette.muted }]}
                >
                  {pref.value}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          {actions.map((action) => (
            <Pressable
              key={action.label}
              style={({ pressed }) => [
                styles.actionBtn,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                },
                pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
              ]}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: isDark ? "#2a2f36" : "#e8ecf1" },
                ]}
              >
                <IconSymbol
                  name={action.icon}
                  size={18}
                  color={isDark ? "#d1d5db" : "#4b5563"}
                />
              </View>
              <ThemedText style={styles.actionLabel}>{action.label}</ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Update Onboarding CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.cta,
            { backgroundColor: accent },
            pressed && { opacity: 0.9 },
          ]}
        >
          <IconSymbol name="sparkles" size={18} color="#fff" />
          <View style={styles.ctaText}>
            <ThemedText style={styles.ctaTitle}>Update onboarding</ThemedText>
            <ThemedText style={styles.ctaSub}>
              Refresh your taste profile
            </ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={16} color="#fff" />
        </Pressable>

        {/* Danger Zone */}
        <Pressable
          style={({ pressed }) => [
            styles.dangerBtn,
            { borderColor: "#ef4444" + "40" },
            pressed && { opacity: 0.8 },
          ]}
        >
          <ThemedText style={styles.dangerText}>Sign out</ThemedText>
        </Pressable>
      </ScrollView>
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
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  name: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    gap: 2,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  prefIcon: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  prefText: {
    flex: 1,
  },
  prefLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 1,
  },
  prefValue: {
    fontSize: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  actionBtn: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    gap: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 12,
  },
  ctaText: {
    flex: 1,
  },
  ctaTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  ctaSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },
  dangerBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  dangerText: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: 13,
  },
});
