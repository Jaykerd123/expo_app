import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';
import { Colors } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile ⛺️</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name || 'N/A'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{user?.id || 'N/A'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
  label: {
    fontWeight: '600',
    color: Colors.earth,
  },
  value: {
    fontWeight: '400',
  },
  button: {
    marginTop: 30,
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