import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker /* , PROVIDER_GOOGLE */ } from "react-native-maps";
import type { JobMarker } from "../lib/api";

const inExpoGo = Constants.appOwnership === "expo";

type Props = {
  markers: JobMarker[];
  expanded: boolean;
  onOpenMaps?: () => void;
};

export default function MapPreview({ markers, expanded, onOpenMaps }: Props) {
  const region = useMemo(
    () => ({
      latitude: markers[0]?.lat ?? 47.6062,
      longitude: markers[0]?.lng ?? -122.3321,
      latitudeDelta: expanded ? 0.12 : 0.2,
      longitudeDelta: expanded ? 0.12 : 0.2,
    }),
    [markers, expanded]
  );

  if (inExpoGo) {
    // Expo Go fallback: show your existing static box/ui
    return (
      <View style={[styles.wrap, expanded ? styles.expanded : styles.collapsed]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "#eef2ff" }]} />
        <Text style={styles.fallbackText}>Map preview unavailable in Expo Go</Text>
        <Footer onOpenMaps={onOpenMaps} />
      </View>
    );
  }

  return (
    <View style={[styles.wrap, expanded ? styles.expanded : styles.collapsed]}>
      <MapView
        style={StyleSheet.absoluteFill}
        // provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            title={m.title}
            description={`$${m.payout} • ${m.distanceMiles} mi`}
          />
        ))}
      </MapView>
      <Footer onOpenMaps={onOpenMaps} />
    </View>
  );
}

function Footer({ onOpenMaps }: { onOpenMaps?: () => void }) {
  return (
    <View style={styles.footer}>
      <View style={styles.inline}>
        <Ionicons name="people-outline" size={16} color="#6b7280" />
        <Text style={styles.muted}>Jobs nearby</Text>
      </View>
      <Pressable onPress={onOpenMaps}>
        <View style={styles.inline}>
          <Ionicons name="navigate-outline" size={16} color="#2563eb" />
          <Text style={styles.link}>Open Maps</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  collapsed: { height: 160 },
  expanded: { height: 300 },
  inline: { flexDirection: "row", alignItems: "center", gap: 6 },
  muted: { color: "#6b7280", fontSize: 14 },
  link: { color: "#6366f1", fontWeight: "600", marginLeft: 4 },
  footer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  fallbackText: {
    position: "absolute",
    top: 12,
    left: 12,
    color: "#6b7280",
    fontSize: 12,
    fontStyle: "italic",
  },
});
