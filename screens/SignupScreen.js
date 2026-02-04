import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { UserContext } from '../UserContext';
import { Colors } from '../theme';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser, login } = useContext(UserContext);

  const handleSignup = () => {
    if (!name.trim() || !id.trim() || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Save user and navigate to Home
    const newUser = { name: name.trim(), id: id.trim(), password };
    setUser(newUser);
    login(newUser.name, newUser.id);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up for Camp</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
    fontSize: 28,
    fontWeight: '700',
    marginTop: 40,
    marginBottom: 20,
    color: Colors.forest,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.forest,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.forest,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.textOnForest,
    fontWeight: '600',
  },
  link: {
    color: Colors.forest,
    marginTop: 14,
  },
});