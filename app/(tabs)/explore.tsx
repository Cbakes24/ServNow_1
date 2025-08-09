import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  {
    id: '1',
    title: 'Plumbing',
    description: 'Repair, installation, and maintenance',
    icon: '🔧',
    price: 'From $75',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'HVAC',
    description: 'Heating, ventilation, and air conditioning',
    icon: '❄️',
    price: 'From $100',
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Electrical',
    description: 'Wiring, repairs, and installations',
    icon: '⚡',
    price: 'From $85',
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Cleaning',
    description: 'House cleaning and maintenance',
    icon: '🧹',
    price: 'From $60',
    rating: 4.6,
  },
  {
    id: '5',
    title: 'Landscaping',
    description: 'Lawn care and garden maintenance',
    icon: '🌱',
    price: 'From $50',
    rating: 4.5,
  },
  {
    id: '6',
    title: 'Appliance Repair',
    description: 'Repair and maintenance services',
    icon: '🔌',
    price: 'From $90',
    rating: 4.7,
  },
];

export default function ServicesScreen() {
  const renderServiceItem = ({ item }: { item: typeof services[0] }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceIcon}>{item.icon}</Text>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{item.title}</Text>
          <Text style={styles.serviceDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.serviceFooter}>
        <Text style={styles.servicePrice}>{item.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>Browse and book professional services</Text>
      </View>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
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
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 20,
  },
  serviceCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  ratingContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
  },
  navigationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navigationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
