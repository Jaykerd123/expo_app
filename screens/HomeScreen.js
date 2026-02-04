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

      <TouchableOpacity
        style={styles.button}
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
    marginTop: 40,
    marginBottom: 20,
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