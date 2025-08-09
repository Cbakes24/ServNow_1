import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockJobs = [
  {
    id: '1',
    title: 'Plumbing Repair',
    address: '123 Main St, City, State',
    time: '9:00 AM',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: '2',
    title: 'HVAC Maintenance',
    address: '456 Oak Ave, City, State',
    time: '11:30 AM',
    status: 'Scheduled',
    priority: 'Medium',
  },
  {
    id: '3',
    title: 'Electrical Work',
    address: '789 Pine Rd, City, State',
    time: '2:00 PM',
    status: 'Scheduled',
    priority: 'Low',
  },
  {
    id: '4',
    title: 'Appliance Repair',
    address: '321 Elm St, City, State',
    time: '4:30 PM',
    status: 'Pending',
    priority: 'Medium',
  },
];

export default function ContractorJobs() {
  const renderJobItem = ({ item }: { item: typeof mockJobs[0] }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>
      <Text style={styles.jobAddress}>{item.address}</Text>
      <View style={styles.jobFooter}>
        <Text style={styles.jobTime}>{item.time}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#FF6B6B';
      case 'Medium':
        return '#FFA726';
      case 'Low':
        return '#66BB6A';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return '#2196F3';
      case 'Scheduled':
        return '#FF9800';
      case 'Pending':
        return '#9E9E9E';
      case 'Completed':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Jobs</Text>
        <Text style={styles.subtitle}>Manage your assigned jobs</Text>
      </View>
      <FlatList
        data={mockJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  jobCard: {
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  jobAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
}); 
