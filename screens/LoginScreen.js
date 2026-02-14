import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, RobotoSlab_600SemiBold } from '@expo-google-fonts/roboto-slab';
import { UserContext } from '../UserContext';

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    RobotoSlab_600SemiBold,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(UserContext);

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    if (!username.trim() || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    if (user && user.id) {
      if ((username === user.id || username === user.name) && password === user.password) {
        login(user.name, user.id);
        navigation.replace('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } else {
      login(username, username);
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Camp</Text>

      <TextInput
        style={[styles.input, { width: Math.min(width * 0.9, 360) }]}
        placeholder="Email or Username"
        placeholderTextColor="rgba(255,255,255,0.6)"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { width: Math.min(width * 0.9, 360) }]}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleLogin}
        style={[styles.buttonWrapper, { width: Math.min(width * 0.9, 360) }]}
      >
        <LinearGradient
          colors={['#FF8C42', '#4285F4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 16 }}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e', // VS Code dark mode
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'RobotoSlab_600SemiBold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: 30,
    color: '#ffffff',
    marginBottom: 16,
    backgroundColor: 'transparent',
    fontFamily: 'RobotoSlab_600SemiBold',
    fontSize: 16,
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'RobotoSlab_600SemiBold',
    fontSize: 18,
    letterSpacing: 1,
  },
  link: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 14,
  },
});
