// EarningsScreen.tsx (or .jsx)
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// ---- Mock data you'd replace with API results ----
const JOBS = [
  { id: "1", title: "Kitchen Faucet Install", date: "2025-08-02", amount: 180, status: "Paid" },
  { id: "2", title: "Ceiling Fan Replace",   date: "2025-08-01", amount: 125, status: "Paid" },
  { id: "3", title: "IKEA Assembly",         date: "2025-07-31", amount: 90,  status: "Paid" },
  { id: "4", title: "Drywall Patch",         date: "2025-07-29", amount: 150, status: "Pending" },
];

export default function EarningsScreen() {
  // In real app, fetch these from backend
  const [available, setAvailable] = useState(420.0);   // available to cash out
  const [pending]   = useState(150.0);
  const [lifetime]  = useState(12345.67);

  const [amountText, setAmountText] = useState(String(420));
  const [method, setMethod] = useState<"standard" | "instant">("standard");

  const amount = useMemo(() => {
    const n = parseFloat(amountText.replace(/[^0-9.]/g, ""));
    if (isNaN(n)) return 0;
    return Math.min(Math.max(n, 0), available);
  }, [amountText, available]);

  const fee = useMemo(() => (method === "instant" ? round2(amount * 0.02) : 0), [amount, method]);
  const payout = useMemo(() => round2(amount - fee), [amount, fee]);

  const canCashOut = amount >= 10 && payout > 0; // simple rule: min $10

  function handleMax() {
    setAmountText(String(round2(available)));
  }

  function handleCashOut() {
    if (!canCashOut) {
      Alert.alert("Cash out unavailable", "Enter at least $10 and pick a method.");
      return;
    }
    // Confirm dialog
    const subtitle =
      method === "instant"
        ? `Instant • Fee 2%: $${fee.toFixed(2)}`
        : "Standard • Free (1–3 business days)";
    Alert.alert(
      "Confirm cash out",
      `${subtitle}\n\nAmount: $${amount.toFixed(2)}\nYou receive: $${payout.toFixed(2)}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            // Simulate success. In real app, call your payout API, then refresh balances.
            setAvailable(prev => round2(prev - amount));
            setAmountText("0");
            Alert.alert("Cash out requested", `You’ll receive $${payout.toFixed(2)}${method === "standard" ? " in 1–3 business days." : " instantly."}`);
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top cards */}
        <View style={styles.cardsRow}>
          <StatCard label="Available" value={money(available)} accent />
          <StatCard label="Pending" value={money(pending)} />
          <StatCard label="Lifetime" value={money(lifetime)} />
        </View>

        {/* Cash out */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cash Out</Text>

          <View style={styles.methodRow}>
            <MethodCard
              title="Standard"
              subtitle="1–3 business days"
              price="Free"
              selected={method === "standard"}
              onPress={() => setMethod("standard")}
            />
            <MethodCard
              title="Instant"
              subtitle="Arrives now"
              price="2% fee"
              selected={method === "instant"}
              onPress={() => setMethod("instant")}
            />
          </View>

          <View style={styles.amountRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Amount</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.dollar}>$</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  value={amountText}
                  onChangeText={setAmountText}
                  placeholder="0.00"
                  style={styles.input}
                />
              </View>
            </View>
            <TouchableOpacity onPress={handleMax} style={styles.maxBtn}>
              <Text style={styles.maxBtnText}>MAX</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <Row label="Fee" value={`$${fee.toFixed(2)}`} />
            <Row label="You receive" value={`$${payout.toFixed(2)}`} bold />
          </View>

          <TouchableOpacity
            disabled={!canCashOut}
            onPress={handleCashOut}
            style={[styles.primaryBtn, !canCashOut && styles.btnDisabled]}
          >
            <Text style={styles.primaryBtnText}>
              {method === "instant" ? "Cash Out Instantly" : "Cash Out (Free)"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.hintText}>
            Minimum cash out is $10. Standard cash out typically arrives in 1–3 business days.
          </Text>
        </View>

        {/* Recent jobs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          <FlatList
            data={JOBS}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <JobRow job={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- UI bits ----------
function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={[styles.statCard, accent && styles.statAccent]}>
      <Text style={[styles.statLabel, accent && styles.statLabelAccent]}>{label}</Text>
      <Text style={[styles.statValue, accent && styles.statValueAccent]}>{value}</Text>
    </View>
  );
}

function MethodCard({
  title,
  subtitle,
  price,
  selected,
  onPress,
}: {
  title: string;
  subtitle: string;
  price: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.methodCard, selected && styles.methodSelected]}
      activeOpacity={0.9}
    >
      <Text style={styles.methodTitle}>{title}</Text>
      <Text style={styles.methodSubtitle}>{subtitle}</Text>
      <View style={{ flex: 1 }} />
      <Text style={styles.methodPrice}>{price}</Text>
    </TouchableOpacity>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

function JobRow({ job }: { job: { title: string; date: string; amount: number; status: string } }) {
  const statusStyle =
    job.status === "Paid" ? styles.badgePaid : job.status === "Pending" ? styles.badgePending : styles.badge;
  return (
    <View style={styles.jobRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobDate}>{formatDate(job.date)}</Text>
      </View>
      <View style={styles.jobRight}>
        <Text style={styles.jobAmount}>{money(job.amount)}</Text>
        <View style={[styles.badge, statusStyle]}>
          <Text style={styles.badgeText}>{job.status}</Text>
        </View>
      </View>
    </View>
  );
}

// ---------- helpers ----------
function money(n: number) {
  return `$${n.toFixed(2)}`;
}
function formatDate(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString();
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// ---------- styles ----------
const R = {
  radius: 14,
  gap: 12,
  pad: 16,
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F7FA" },

  // cards
  cardsRow: {
    flexDirection: "row",
    gap: R.gap,
    paddingHorizontal: R.pad,
    paddingTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: R.radius,
    padding: R.pad,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statAccent: { backgroundColor: "#B9FF66" },
  statLabel: { color: "#123456", fontSize: 12, marginBottom: 6 },
  statLabelAccent: { color: "#123456", fontSize: 12, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: "700", color: "#123456" },
  statValueAccent: { fontSize: 22, fontWeight: "700", color: "#123456" },

  // sections
  section: { marginTop: 18, paddingHorizontal: R.pad },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#123456", marginBottom: 10 },

  // method
  methodRow: { flexDirection: "row", gap: R.gap },
  methodCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: R.radius,
    padding: R.pad,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  methodSelected: { borderColor: "#1E40AF" },
  methodTitle: { fontWeight: "700", fontSize: 16, color: "#1E40AF" },
  methodSubtitle: { color: "1E40AF", marginTop: 2 },
  methodPrice: { fontWeight: "600", marginTop: 8, color: "1E40AF" },

  // amount
  amountRow: { flexDirection: "row", alignItems: "flex-end", gap: R.gap, marginTop: 14 },
  inputLabel: { color: "#123456", marginBottom: 6 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: R.radius,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 48,
  },
  dollar: { fontSize: 18, color: "#123456", marginRight: 4 },
  input: { flex: 1, fontSize: 18, color: "#123456", paddingVertical: 0 },
  maxBtn: {
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "#B9FF66",
    borderRadius: R.radius,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B9FF66",
  },
  maxBtnText: { color: "#123456", fontWeight: "700" },

  summaryRow: { marginTop: 12, gap: 6 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  rowLabel: { color: "#123456" },
  rowValue: { color: "#123456" },
  bold: { fontWeight: "700" },

  primaryBtn: {
    marginTop: 14,
    height: 52,
    backgroundColor: "#B9FF66",
    borderRadius: R.radius,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: { backgroundColor: "#9CA3AF" },
  primaryBtnText: { color: "#123456", fontSize: 16, fontWeight: "700" },
  hintText: { marginTop: 8, color: "#123456", fontSize: 12 },

  // jobs
  separator: { height: 12 },
  jobRow: {
    backgroundColor: "white",
    borderRadius: R.radius,
    padding: R.pad,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  jobTitle: { fontWeight: "600", color: "#0041C2" },
  jobDate: { color: "#123456", marginTop: 2, fontSize: 12 },
  jobRight: { alignItems: "flex-end" },
  jobAmount: { fontWeight: "700", color: "#123456" },

  badge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  badgePaid: { backgroundColor: "#DCFCE7" },
  badgePending: { backgroundColor: "#FEF3C7" },
  badgeText: { fontSize: 12, color: "#123456" },
});
