import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContractorHome() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Contractor</Text>
          <Text style={styles.subtitle}>Your Jobs & Stats</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Active Jobs</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Completed Today</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Todays Schedule</Text>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleTime}>9:00 AM</Text>
              <Text style={styles.scheduleText}>Plumbing Repair - 123 Main St</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleTime}>11:30 AM</Text>
              <Text style={styles.scheduleText}>HVAC Maintenance - 456 Oak Ave</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleTime}>2:00 PM</Text>
              <Text style={styles.scheduleText}>Electrical Work - 789 Pine Rd</Text>
            </View>
          </View>

          {/* Navigation to Customer Views */}
          <View style={styles.navigationCard}>
            <Text style={styles.navigationTitle}>Switch to Customer View</Text>
            <View style={styles.navigationButtons}>
              <Link href="/(tabs)" asChild>
                <TouchableOpacity style={styles.navButton}>
                  <Text style={styles.navButtonText}>Customer Home</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/(tabs)/explore" asChild>
                <TouchableOpacity style={styles.navButton}>
                  <Text style={styles.navButtonText}>Services</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/(tabs)/profile" asChild>
                <TouchableOpacity style={styles.navButton}>
                  <Text style={styles.navButtonText}>Profile</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#123456',
  },
  subtitle: {
    fontSize: 18,
    color: '#123456',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#B9FF66',
  },
  statLabel: {
    fontSize: 14,
    color: '#123456',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#123456',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0041C2',
    width: 80,
  },
  scheduleText: {
    fontSize: 14,
    color: '#123456',
    flex: 1,
  },
  navigationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  navigationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#123456',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    backgroundColor: '#B9FF66',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#191A23',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
