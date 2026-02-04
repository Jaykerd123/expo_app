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

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(UserContext);

  const handleLogin = () => {
    if (!username.trim() || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    // If a registered user exists, require matching credentials
    if (user && user.id) {
      if ((username === user.id || username === user.name) && password === user.password) {
        login(user.name, user.id);
        navigation.replace('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } else {
      // No registered user - accept non-empty credentials and navigate
      login(username, username);
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Camp</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
    backgroundColor: Colors.accent,
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