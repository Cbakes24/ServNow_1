import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";

/* ---------- types ---------- */
type Job = {
id: string;
customer: string;
category: string;
price: number;
status: "confirmed" | "pending";
start: string;
end: string;
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

/* ---------- mock data (from the new ZIP layout) ---------- */
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

/* markers for the mini-map */
const mapMarkers = [
{ id: "m1", label: "Cleaning • $120 • 0.8 mi", top: "18%", left: "22%" },
{ id: "m2", label: "Landscaping • $280 • 1.2 mi", top: "55%", left: "30%" },
{ id: "m3", label: "Paint • $450 • 2.1 mi", top: "70%", left: "15%" },
{ id: "m4", label: "Handyman • $95 • 1.5 mi", top: "40%", left: "65%" },
];

export default function ContractorHomeScreen() {
  const [isExpanded, setExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

const weekly = useMemo(
  () => ({
    jobs: 8,
    earnings: 1240,
    rating: 4.9,
    responseMins: 2,
    name: "Mike",
    city: "Seattle",
    isOnline: isOnline,
  }),
  [isOnline]
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
        
        {/* Profile picture with dropdown */}
        <Pressable onPress={() => setShowDropdown(!showDropdown)} style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/profilePicLeon.jpg")}
            style={styles.avatar}
          />
          <Ionicons name="chevron-down" size={16} color="#6b7280" style={styles.dropdownIcon} />
          
          {/* Dropdown Menu */}
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              <Link href="/(tabs)" asChild>
                <Pressable style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                  <Ionicons name="person-outline" size={18} color="#6b7280" />
                  <Text style={styles.dropdownText}>Switch to Customer</Text>
                </Pressable>
              </Link>
              <Link href="/(tabs)/explore" asChild>
                <Pressable style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                  <Ionicons name="search-outline" size={18} color="#6b7280" />
                  <Text style={styles.dropdownText}>Browse Services</Text>
                </Pressable>
              </Link>
              <Pressable style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
                <Ionicons name="settings-outline" size={18} color="#6b7280" />
                <Text style={styles.dropdownText}>Settings</Text>
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {/* Backdrop to close dropdown */}
      {showDropdown && (
        <Pressable 
          style={styles.backdrop} 
          onPress={() => setShowDropdown(false)} 
        />
      )}
      <View style={{ alignItems: "center", marginTop: 8 }}>
        <Image
          source={require("../../assets/images/profilePicLeon.jpg")} // replace with your URL
          style={{ width: 64, height: 64, borderRadius: 32 }}
        />
        <Text style={{ marginTop: 6, fontSize: 16, fontWeight: "600" }}>
          {weekly.name}
        </Text>
        
        {/* Online/Offline Toggle */}
        <View style={styles.onlineToggle}>
          <View style={styles.inline}>
            <View
              style={[
                styles.dot,
                { backgroundColor: weekly.isOnline ? "#16a34a" : "#9ca3af" },
              ]}
            />
            <Text
              style={[
                styles.muted,
                { color: weekly.isOnline ? "#16a34a" : "#6b7280" },
              ]}
            >
              {weekly.isOnline ? "Online" : "Offline"}
            </Text>
            <Switch
              value={weekly.isOnline}
              onValueChange={(value) => setIsOnline(value)}
              trackColor={{ false: "#d1d5db", true: "#16a34a" }}
              thumbColor={weekly.isOnline ? "#ffffff" : "#ffffff"}
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>
      </View>
      {/* Weekly stats */}
      <View style={styles.statsRow}>
        <StatPill
          label="Jobs"
          value={String(weekly.jobs)}
          icon={<Ionicons name="briefcase-outline" size={18} />}
        />
        <StatPill
          label="Week"
          value={`$${weekly.earnings}`}
          icon={<MaterialIcons name="attach-money" size={18} />}
        />
        <StatPill
          label="Rating"
          value={weekly.rating.toFixed(1)}
          icon={<Ionicons name="star" size={18} />}
        />
        <StatPill
          label="Response"
          value={`${weekly.responseMins} min`}
          icon={<Ionicons name="flash-outline" size={18} />}
        />
      </View>

      {/* Map preview (new) */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Nearby Map</Text>
        <Pressable hitSlop={8} onPress={() => setExpanded((v) => !v)}>
          <Text style={styles.link}>
            {isExpanded ? "Collapse" : "Expand"}
          </Text>
        </Pressable>
      </View>

      <MapPreview expanded={isExpanded} />

      {/* Today’s schedule */}
      <SectionTitle
        title="Today's Schedule"
        rightText={`${todaysJobs.length} jobs`}
      />
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

      {/* Available near you */}
      <SectionTitle
        title="Available Jobs Near You"
        rightText="See All"
        onRightPress={() => Alert.alert("See All")}
      />
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

      {/* Quick tiles */}
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

/* ---------- Map preview ---------- */
function MapPreview({ expanded }: { expanded: boolean }) {
// If you have a static map image, add it to your assets and import here.
// For now, we render a neutral background with positioned markers to match the Figma layout.
return (
  <View
    style={[
      styles.mapWrap,
      expanded ? styles.mapExpanded : styles.mapCollapsed,
    ]}
  >
    {/* Replace ImageBackground source with your asset if you have one */}
    <ImageBackground
      source={undefined as any}
      style={StyleSheet.absoluteFill}
    />
    {/* fake basemap tint */}
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "#eef2ff" }]} />

    {/* markers */}
    {mapMarkers.map((m) => (
      <View
        key={m.id}
        style={[styles.marker, { top: m.top as any, left: m.left as any }]}
      >
        <Ionicons name="location" size={18} color="#2563eb" />
        <Text style={styles.markerText}>{m.label}</Text>
      </View>
    ))}

    {/* footer controls */}
    <View style={styles.mapFooter}>
      <View style={styles.inline}>
        <Ionicons name="people-outline" size={16} color="#6b7280" />
        <Text style={styles.muted}>Jobs nearby</Text>
      </View>
      <Pressable
        onPress={() => Alert.alert("Navigate", "Opening map…")}
        hitSlop={8}
      >
        <View style={styles.inline}>
          <Ionicons name="navigate-outline" size={16} color="#2563eb" />
          <Text style={[styles.link, { marginLeft: 4 }]}>Open Maps</Text>
        </View>
      </Pressable>
    </View>
  </View>
);
}

/* ---------- UI bits ---------- */
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
      <Text style={styles.meta}>
        {job.start} – {job.end}
      </Text>
      <Ionicons
        name="location-outline"
        size={16}
        color="#6b7280"
        style={{ marginLeft: 12 }}
      />
      <Text style={styles.meta}>
        {job.area} • {job.distanceMiles} miles
      </Text>
    </View>

    <View style={styles.ctaRow}>
      <Button variant="ghost" title="View Details" onPress={onDetails} />
      <Button title="Navigate" onPress={() => openMaps(job.area)} />
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
          <Text style={styles.meta}>
            {job.area} • {job.distanceMiles} miles
          </Text>
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
      style={[styles.btnText, variant === "ghost" && { color: "#111827" }]}
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
container: { padding: 16, gap: 18, zIndex: 1 },
headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
hi: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 4 },
inline: { flexDirection: "row", alignItems: "center", gap: 6 },
inlineSpace: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 8,
},
muted: { color: "#6b7280", fontSize: 14 },
mutedSmall: { color: "#9ca3af", fontSize: 12 },
dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
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
sectionRow: {
  marginTop: 6,
  marginBottom: 8,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
sectionTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
link: { color: "#6366f1", fontWeight: "600" },

/* map */
mapWrap: {
  backgroundColor: "#fff",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  overflow: "hidden",
},
mapCollapsed: { height: 160 },
mapExpanded: { height: 300 },
marker: {
  position: "absolute",
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 999,
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: "#e5e7eb",
},
markerText: { color: "#111827", fontSize: 12, fontWeight: "600" },
mapFooter: {
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

/* cards */
card: {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 14,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  zIndex: 1,
},
cardTopRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
},
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
metaRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 4,
  gap: 6,
  flexWrap: "wrap",
},
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

/* quick tiles */
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

/* profile picture with dropdown */
profileContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: "#f3f4f6",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  position: "relative",
  zIndex: 9999, // Very high z-index to appear above everything
},
avatar: { width: 36, height: 36, borderRadius: 18 },
dropdownIcon: { marginLeft: 4 },
dropdownMenu: {
  position: "absolute",
  top: 50, // Adjust as needed
  right: 0,
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 10, // Higher elevation for Android
  zIndex: 9999, // Very high z-index to appear above everything
  minWidth: 180, // Ensure dropdown has proper width
},
dropdownItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 8,
},
dropdownText: { color: "#374151", fontSize: 14, fontWeight: "500" },
backdrop: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)", // Lighter overlay
  zIndex: 9998, // High but below dropdown
},

/* Online/Offline Toggle */
onlineToggle: {
  marginTop: 12,
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: "#f3f4f6",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#e5e7eb",
},
});
