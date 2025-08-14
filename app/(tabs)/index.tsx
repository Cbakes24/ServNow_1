import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

/* ---------------- mock data ---------------- */

const categories = [
  { id: "cat1", name: "Landscaping", icon: <MaterialCommunityIcons name="shovel" size={18} /> },
  { id: "cat2", name: "Electrical", icon: <MaterialCommunityIcons name="lightning-bolt" size={18} /> },
  { id: "cat3", name: "HVAC", icon: <MaterialCommunityIcons name="air-filter" size={18} /> },
  { id: "cat4", name: "Cleaning", icon: <MaterialIcons name="cleaning-services" size={18} /> },
  { id: "cat5", name: "Handyman", icon: <MaterialCommunityIcons name="toolbox" size={18} /> },
  { id: "cat6", name: "Plumbing", icon: <MaterialCommunityIcons name="pipe" size={18} /> },
];

const popularNearYou = [
  {
    id: "p1",
    title: "Interior Painting",
    price: 450,
    rating: 4.8,
    reviews: 132,
    distance: "2.1 mi",
    tag: "Instant Book",
  },
  {
    id: "p2",
    title: "Handyman (2 hrs)",
    price: 95,
    rating: 4.9,
    reviews: 88,
    distance: "1.5 mi",
    tag: "Today",
  },
  {
    id: "p3",
    title: "Yard Cleanup",
    price: 180,
    rating: 4.7,
    reviews: 64,
    distance: "0.9 mi",
    tag: "Popular",
  },
];

const upcoming = [
  {
    id: "u1",
    service: "House Cleaning",
    date: "Tomorrow, 9:00 AM",
    area: "Belltown",
    pro: "Sarah J.",
    status: "Confirmed",
  },
];

/* ---------------- screen ---------------- */

export default function CustomerHomeScreen() {
  const [query, setQuery] = useState("");
  const me = useMemo(
    () => ({ name: "Cory", city: "Seattle", address: "1230 Beach Ave" }),
    []
  );

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container}>
        {/* Header */}
        <View style={s.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.hi}>Good afternoon, {me.name}!</Text>
            <View style={s.inline}>
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text style={s.muted}>Near {me.city}</Text>
            </View>
          </View>

          {/* tiny profile pic */}
          <Image
            source={require("../../assets/images/profilePicLeon.jpg")}
            style={s.avatar}
          />
        </View>

        {/* Address pill */}
        <Pressable style={s.addrPill} onPress={() => Alert.alert("Change address")}>
          <Ionicons name="home-outline" size={16} color="#111827" />
          <Text style={s.addrText} numberOfLines={1}>{me.address}</Text>
          <Ionicons name="chevron-forward" size={16} color="#6b7280" />
        </Pressable>

        {/* Search bar */}
        <View style={s.searchBox}>
          <Ionicons name="search" size={18} color="#6b7280" />
          <TextInput
            placeholder="What do you need done?"
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
            style={s.searchInput}
            returnKeyType="search"
            onSubmitEditing={() => Alert.alert("Search", query || "All services")}
          />
          <Pressable hitSlop={8} onPress={() => Alert.alert("Filters")}>
            <Ionicons name="options-outline" size={20} color="#111827" />
          </Pressable>
        </View>

        {/* Start a Request CTA - moved to top */}
        <View style={s.startRequestCta}>
          <PrimaryButton title="Start a Request" onPress={() => Alert.alert("New request")} />
        </View>

        {/* Quick actions */}
        <View style={s.qaRow}>
          <QuickAction
            icon={<Ionicons name="flash" size={20} />}
            title="Instant Book"
            onPress={() => Alert.alert("Instant Book")}
          />
          <QuickAction
            icon={<Ionicons name="calendar-outline" size={20} />}
            title="Schedule"
            onPress={() => Alert.alert("Schedule")}
          />
          <QuickAction
            icon={<Ionicons name="chatbubbles-outline" size={20} />}
            title="Messages"
            onPress={() => Alert.alert("Messages")}
          />
        </View>

        {/* Categories */}
        <SectionTitle title="Popular Categories" rightText="See All" onRightPress={() => Alert.alert("All categories")} />
        <View style={s.categoriesGrid}>
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              label={c.name}
              icon={c.icon}
              onPress={() => Alert.alert("Category", c.name)}
            />
          ))}
        </View>

        {/* Popular near you */}
        <SectionTitle title="Popular Near You" />
        <View style={{ gap: 12 }}>
          {popularNearYou.map((p) => (
            <ProCard
              key={p.id}
              title={p.title}
              price={p.price}
              rating={p.rating}
              reviews={p.reviews}
              distance={p.distance}
              tag={p.tag}
              onPress={() => Alert.alert("Details", p.title)}
              onBook={() => Alert.alert("Continue", `Book ${p.title}`)}
            />
          ))}
        </View>

        {/* Upcoming */}
        <SectionTitle title="Upcoming" />
        <View style={{ gap: 10 }}>
          {upcoming.map((u) => (
            <UpcomingJob key={u.id} item={u} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- components ---------------- */

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
    <View style={s.sectionRow}>
      <Text style={s.sectionTitle}>{title}</Text>
      {rightText ? (
        <Pressable hitSlop={8} onPress={onRightPress}>
          <Text style={s.link}>{rightText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function QuickAction({
  icon,
  title,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={s.qaItem}>
      <View style={s.qaIcon}>{icon}</View>
      <Text style={s.qaText}>{title}</Text>
    </Pressable>
  );
}

function CategoryCard({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={s.categoryCard}>
      <View style={s.categoryIcon}>{icon}</View>
      <Text style={s.categoryText}>{label}</Text>
    </Pressable>
  );
}

function ProCard({
  title,
  price,
  rating,
  reviews,
  distance,
  tag,
  onPress,
  onBook,
}: {
  title: string;
  price: number;
  rating: number;
  reviews: number;
  distance: string;
  tag?: string;
  onPress: () => void;
  onBook: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={s.card}>
      <View style={s.cardTopRow}>
        <View style={{ flex: 1 }}>
          <Text style={s.cardTitle}>{title}</Text>
          <View style={s.inline}>
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text style={s.meta}>
              {rating.toFixed(1)} • {reviews} reviews • {distance}
            </Text>
          </View>
        </View>
        <Text style={s.price}>${price.toFixed(2)}</Text>
      </View>

      {tag ? (
        <View style={s.badge}>
          <Text style={s.badgeText}>{tag}</Text>
        </View>
      ) : null}

      <View style={s.ctaRow}>
        <Button variant="ghost" title="Details" onPress={onPress} />
        <Button title="Book" onPress={onBook} />
      </View>
    </Pressable>
  );
}

function UpcomingJob({
  item,
}: {
  item: { service: string; date: string; area: string; pro: string; status: string };
}) {
  return (
    <View style={s.card}>
      <View style={s.cardTopRow}>
        <View>
          <Text style={s.cardTitle}>{item.service}</Text>
          <View style={s.inline}>
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text style={s.meta}>{item.date}</Text>
          </View>
          <View style={s.inline}>
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text style={s.meta}>{item.area}</Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <View style={s.statusChip}>
            <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
            <Text style={s.statusText}>{item.status}</Text>
          </View>
          <Text style={[s.mutedSmall, { marginTop: 6 }]}>with {item.pro}</Text>
        </View>
      </View>
    </View>
  );
}

function Button({
  title,
  onPress,
  variant = "primary",
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "ghost";
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[s.btn, variant === "ghost" && s.btnGhost]}
    >
      <Text style={[s.btnText, variant === "ghost" && { color: "#111827" }]}>
        {title}
      </Text>
    </Pressable>
  );
}

function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={s.primaryBtn}>
      <Text style={s.primaryBtnText}>{title}</Text>
    </Pressable>
  );
}

/* ---------------- styles ---------------- */

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 16, gap: 18 },

  headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  hi: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 4 },
  inline: { flexDirection: "row", alignItems: "center", gap: 6 },
  muted: { color: "#6b7280", fontSize: 14 },
  mutedSmall: { color: "#9ca3af", fontSize: 12 },

  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: "#e5e7eb" },

  addrPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  addrText: { color: "#111827", maxWidth: 220 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchInput: { flex: 1, paddingVertical: 0, color: "#111827" },

  startRequestCta: {
    marginTop: 14,
    marginBottom: 14,
  },

  qaRow: { flexDirection: "row", gap: 12 },
  qaItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    gap: 8,
  },
  qaIcon: { backgroundColor: "#eef2ff", padding: 8, borderRadius: 10 },
  qaText: { fontWeight: "600", color: "#111827" },

  sectionRow: {
    marginTop: 6,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  link: { color: "#6366f1", fontWeight: "600" },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  chipText: { color: "#111827", fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  price: { color: "#16a34a", fontSize: 18, fontWeight: "800" },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#eef2ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },
  badgeText: { color: "#3730a3", fontWeight: "600", fontSize: 12 },

  meta: { color: "#6b7280" },

  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: { color: "#166534", fontWeight: "600", fontSize: 12 },

  ctaRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  btn: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnGhost: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e5e7eb" },
  btnText: { color: "#fff", fontWeight: "700" },

  footerCta: { marginTop: 14 },
  primaryBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontWeight: "800" },

  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryCard: {
    width: "48%", // Adjust as needed for grid layout
    aspectRatio: 1.2, // Make cards taller than wide
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  categoryIcon: {
    backgroundColor: "#eef2ff",
    padding: 12,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
});
