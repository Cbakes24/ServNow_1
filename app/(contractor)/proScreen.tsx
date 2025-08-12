import React, { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

type Job = {
  id: string;
  customer: string;
  category: string;
  price: number;
  status: "confirmed" | "pending";
  start: string; // ISO or human string
  end: string;   // ISO or human string
  area: string;
  distanceMiles: number;
};

type NearbyJob = {
  id: string;
  title: string;
  price: number;
  when: string;
  area: string;
  distanceMiles: number;
  rating: number;
  postedAgo: string;
};

const todaysJobs: Job[] = [
  {
    id: "1",
    customer: "Sarah Johnson",
    category: "House Cleaning",
    price: 120,
    status: "confirmed",
    start: "2:00 PM",
    end: "4:00 PM",
    area: "Downtown Seattle",
    distanceMiles: 0.8,
  },
  {
    id: "2",
    customer: "Mike Chen",
    category: "Landscaping",
    price: 280,
    status: "confirmed",
    start: "4:30 PM",
    end: "7:00 PM",
    area: "Capitol Hill",
    distanceMiles: 1.2,
  },
];

const nearbyJobs: NearbyJob[] = [
  {
    id: "3",
    title: "Interior Painting",
    price: 450,
    when: "Tomorrow, 9:00 AM",
    area: "Belltown",
    distanceMiles: 2.1,
    rating: 4.8,
    postedAgo: "5 min ago",
  },
  {
    id: "4",
    title: "Handyman Services",
    price: 95,
    when: "Tomorrow, 2:00 PM",
    area: "Queen Anne",
    distanceMiles: 1.5,
    rating: 4.9,
    postedAgo: "12 min ago",
  },
];

export default function ContractorHomeScreen() {
  const weekly = useMemo(
    () => ({
      jobs: 8,
      earnings: 1240,
      rating: 4.9,
      responseMins: 2,
      name: "Mike",
      city: "Seattle",
    }),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hi}>Good afternoon, {weekly.name}!</Text>
            <View style={styles.inline}>
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text style={styles.muted}>Active in {weekly.city}</Text>
            </View>
          </View>
          <View style={styles.inline}>
            <View style={styles.dotOnline} />
            <Text style={[styles.muted, { color: "#16a34a" }]}>Online</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatPill label="Jobs" value={String(weekly.jobs)} icon={<Ionicons name="briefcase-outline" size={18} />} />
          <StatPill label="Week" value={`$${weekly.earnings}`} icon={<MaterialIcons name="attach-money" size={18} />} />
          <StatPill label="Rating" value={weekly.rating.toFixed(1)} icon={<Ionicons name="star" size={18} />} />
          <StatPill label="Response" value={`${weekly.responseMins} min`} icon={<Ionicons name="flash-outline" size={18} />} />
        </View>

        {/* Today’s Schedule */}
        <SectionTitle title="Today's Schedule" rightText={`${todaysJobs.length} jobs`} />
        <View style={{ gap: 12 }}>
          {todaysJobs.map((j) => (
            <JobCard
              key={j.id}
              job={j}
              onDetails={() => Alert.alert("Details", `Job #${j.id}`)}
              onNavigate={() => openMaps(j.area)}
            />
          ))}
        </View>

        {/* Nearby */}
        <SectionTitle title="Available Jobs Near You" rightText="See All" onRightPress={() => Alert.alert("See All")} />
        <View style={{ gap: 12 }}>
          <FlatList
            data={nearbyJobs}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <NearbyJobCard
                job={item}
                onAccept={() => Alert.alert("Accepted", item.title)}
                onDetails={() => Alert.alert("Details", item.title)}
              />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        </View>

        {/* Quick Links */}
        <View style={styles.quickRow}>
          <QuickTile
            title="View Analytics"
            subtitle="Track your performance"
            icon={<MaterialCommunityIcons name="trending-up" size={26} />}
            onPress={() => Alert.alert("Analytics")}
          />
          <QuickTile
            title="Customer Reviews"
            subtitle="See what clients say"
            icon={<Ionicons name="people-outline" size={26} />}
            onPress={() => Alert.alert("Reviews")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- components ---------- */

function SectionTitle({
  title,
  rightText,
  onRightPress,
}: {
  title: string;
  rightText?: string;
  onRightPress?: () => void;
}) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {rightText ? (
        <Pressable hitSlop={8} onPress={onRightPress}>
          <Text style={styles.link}>{rightText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function StatPill({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <View style={styles.statPill}>
      <View style={styles.inline}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function JobCard({
  job,
  onDetails,
  onNavigate,
}: {
  job: Job;
  onDetails: () => void;
  onNavigate: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.cardTitle}>{job.customer}</Text>
          <Text style={styles.cardSub}>{job.category}</Text>
        </View>
        <Text style={styles.price}>${job.price.toFixed(2)}</Text>
      </View>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
          <Text style={styles.badgeText}>
            {job.status === "confirmed" ? "Confirmed" : "Pending"}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="time-outline" size={16} color="#6b7280" />
        <Text style={styles.meta}>{job.start} – {job.end}</Text>
        <Ionicons name="location-outline" size={16} color="#6b7280" style={{ marginLeft: 12 }} />
        <Text style={styles.meta}>
          {job.area} • {job.distanceMiles} miles
        </Text>
      </View>

      <View style={styles.ctaRow}>
        <Button variant="ghost" title="View Details" onPress={onDetails} />
        <Button title="Navigate" onPress={onNavigate} />
      </View>
    </View>
  );
}

function NearbyJobCard({
  job,
  onDetails,
  onAccept,
}: {
  job: NearbyJob;
  onDetails: () => void;
  onAccept: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.cardTitle}>{job.title}</Text>
          <View style={styles.inline}>
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text style={styles.meta}>{job.when}</Text>
          </View>
          <View style={styles.inline}>
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text style={styles.meta}>{job.area} • {job.distanceMiles} miles</Text>
          </View>
        </View>
        <Text style={styles.price}>${job.price.toFixed(2)}</Text>
      </View>

      <View style={styles.inlineSpace}>
        <View style={styles.inline}>
          <Ionicons name="star" size={14} color="#f59e0b" />
          <Text style={styles.meta}>{job.rating} customer</Text>
        </View>
        <Text style={styles.mutedSmall}>Posted {job.postedAgo}</Text>
      </View>

      <View style={styles.ctaRow}>
        <Button variant="ghost" title="Details" onPress={onDetails} />
        <Button variant="success" title="Accept" onPress={onAccept} />
      </View>
    </View>
  );
}

function QuickTile({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.quickTile}>
      <View style={styles.quickIcon}>{icon}</View>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSub}>{subtitle}</Text>
    </Pressable>
  );
}

function Button({
  title,
  onPress,
  variant = "primary",
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "ghost" | "success";
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        variant === "ghost" && styles.btnGhost,
        variant === "success" && styles.btnSuccess,
      ]}
    >
      <Text
        style={[
          styles.btnText,
          variant === "ghost" && { color: "#111827" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

/* ---------- helpers ---------- */

function openMaps(query: string) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
  Linking.openURL(url).catch(() => Alert.alert("Could not open maps"));
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 16, gap: 18 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  hi: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 4 },
  inline: { flexDirection: "row", alignItems: "center", gap: 6 },
  inlineSpace: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  muted: { color: "#6b7280", fontSize: 14 },
  mutedSmall: { color: "#9ca3af", fontSize: 12 },
  dotOnline: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#16a34a", marginRight: 6 },
  statsRow: { flexDirection: "row", gap: 10 },
  statPill: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statValue: { fontWeight: "700", color: "#111827" },
  statLabel: { fontSize: 12, color: "#6b7280" },
  sectionRow: { marginTop: 6, marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  link: { color: "#6366f1", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardSub: { color: "#6b7280", marginTop: 2 },
  price: { color: "#16a34a", fontSize: 18, fontWeight: "800" },
  badgeRow: { marginTop: 10, marginBottom: 6 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "#dcfce7",
  },
  badgeText: { color: "#166534", fontWeight: "600", fontSize: 12 },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 6, flexWrap: "wrap" },
  meta: { color: "#6b7280" },
  ctaRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  btn: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnSuccess: { backgroundColor: "#16a34a" },
  btnGhost: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e5e7eb" },
  btnText: { color: "#fff", fontWeight: "700" },
  quickRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  quickTile: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 8,
  },
  quickIcon: { alignSelf: "flex-start" },
  quickTitle: { fontWeight: "700", color: "#111827" },
  quickSub: { color: "#6b7280" },
});
