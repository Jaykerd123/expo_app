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
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
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
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
    color: Colors.forest,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.earth,
    backgroundColor: 'rgba(255,255,255,0.92)',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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