import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../UserContext';
import { Colors } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name || 'U').charAt(0)}</Text>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.profileSmall}>Camp Enthusiast • Member</Text>
        </View>
      </View>

      <View style={[styles.infoCard, { marginTop: 18 }]}>
        <View style={styles.row}>
          <Text style={styles.label}>Member Since:</Text>
          <Text style={styles.value}>2023</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>you@example.com</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Favorite:</Text>
          <Text style={styles.value}>Tent Camping</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Badges</Text>
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Ionicons name="bonfire-outline" size={16} color={Colors.forest} style={{ marginRight: 4 }} />
          <Text>Camp Starter</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="restaurant-outline" size={16} color={Colors.forest} style={{ marginRight: 4 }} />
          <Text>Campfire Cook</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="leaf-outline" size={16} color={Colors.forest} style={{ marginRight: 4 }} />
          <Text>Trail Blazer</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 22 }]} onPress={() => {}}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.forest,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.tan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.forest,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.forest,
  },
  profileSmall: {
    color: Colors.earth,
  },
  infoCard: {
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    fontWeight: '600',
    color: Colors.earth,
  },
  value: {
    fontWeight: '400',
  },
  button: {
    alignSelf: 'center',
    padding: 12,
    backgroundColor: Colors.forest,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.textOnForest,
    fontWeight: '600',
  },
});
