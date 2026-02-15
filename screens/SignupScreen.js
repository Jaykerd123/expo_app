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
import { useFonts, RobotoSlab_600SemiBold } from '@expo-google-fonts/roboto-slab';
import { UserContext } from '../UserContext';

export default function SignupScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    RobotoSlab_600SemiBold,
  });

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser, login } = useContext(UserContext);

  if (!fontsLoaded) return null;

  const handleSignup = () => {
    if (!name.trim() || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const newUser = { name: name.trim(), id: name.trim(), password };
    setUser(newUser);
    login(newUser.name, newUser.id);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up for Camply</Text>

      <TextInput
        style={[styles.input, { width: Math.min(width * 0.9, 360) }]}
        placeholder="Name"
        placeholderTextColor="rgba(255,255,255,0.6)"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, { width: Math.min(width * 0.9, 360) }]}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={[styles.input, { width: Math.min(width * 0.9, 360) }]}
        placeholder="Confirm Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleSignup}
        style={[styles.signupButton, { width: Math.min(width * 0.9, 360) }]}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 16 }}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c111e', // mostly black with subtle blue tint
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderRadius: 30,
    marginBottom: 16,
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  signupButtonText: {
    color: '#111111',
    fontFamily: 'RobotoSlab_600SemiBold',
    fontSize: 18,
    letterSpacing: 1,
  },
  link: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});
