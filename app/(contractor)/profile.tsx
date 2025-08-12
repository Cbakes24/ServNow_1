import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContractorProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
            </View>
            <Text style={styles.name}>Contractor: John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Personal Information</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Payment Methods</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Addresses</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Service History</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Upcoming Appointments</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Favorites</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Help Center</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Contact Support</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>About ServNow</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
          </View>

          {/* Navigation to Contractor Views */}
          <View style={styles.navigationCard}>
            <Text style={styles.navigationTitle}>Switch to Contractor View</Text>
            <View style={styles.navigationButtons}>
              <Link href="/(contractor)" asChild>
                <TouchableOpacity style={styles.navButton}>
                  <Text style={styles.navButtonText}>Contractor Home</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/(contractor)/jobs" asChild>
                <TouchableOpacity style={styles.navButton}>
                  <Text style={styles.navButtonText}>Jobs</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </Link>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B9FF66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#191A23',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#123456',
  },
  email: {
    fontSize: 16,
    color: '#123456',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 8,
    color: '#123456',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#123456',
  },
  menuArrow: {
    fontSize: 18,
    color: '#123456',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  },
  navigationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#123456',
    marginBottom: 10,
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
    fontSize: 14,
    fontWeight: '600',
  },
}); 
