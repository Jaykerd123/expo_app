import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';
import { Colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(UserContext);

  const displayName = user && user.name ? user.name : 'User';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Welcome, {displayName}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Trip</Text>
        <Text style={styles.cardLine}>Redwood Camp</Text>
        <Text style={styles.cardSmall}>Jul 15 • 2 nights • Yosemite</Text>
        <TouchableOpacity style={styles.cardButton} onPress={() => {}}>
          <Text style={styles.cardButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Nights</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Badges</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        <Text style={styles.activityItem}>🪵 Collected firewood at Redwood Camp</Text>
        <Text style={styles.activityItem}>🌟 Earned "Campfire Cook" badge</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { marginTop: 18 }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logout]}
        onPress={() => {
          logout();
          navigation.popToTop();
          navigation.replace('Welcome');
        }}
      >
        <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 14,
    color: Colors.earth,
  },
  card: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.tan,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontWeight: '700',
    color: Colors.earth,
    marginBottom: 6,
  },
  cardLine: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.forest,
  },
  cardSmall: {
    color: Colors.earth,
    marginTop: 6,
  },
  cardButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.forest,
    borderRadius: 8,
  },
  cardButtonText: {
    color: Colors.textOnForest,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.forest,
  },
  statLabel: {
    color: Colors.earth,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    color: Colors.earth,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 6,
  },
  activityList: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 8,
  },
  activityItem: {
    marginBottom: 6,
    color: Colors.earth,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: Colors.forest,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: Colors.textOnForest,
    fontWeight: '600',
  },
  logout: {
    backgroundColor: Colors.tan,
    borderWidth: 1,
    borderColor: Colors.earth,
  },
  logoutText: {
    color: Colors.earth,
  },
});