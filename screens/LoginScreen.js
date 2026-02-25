import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useFonts, RobotoSlab_600SemiBold } from '@expo-google-fonts/roboto-slab';
import { UserContext } from '../UserContext';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    RobotoSlab_600SemiBold,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(UserContext);

  // Configure Google auth request (using proxy for Expo Go development)
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '657880389882-4fp132ekoi8uodlod46vl1i2uv8i01uo.apps.googleusercontent.com',
    androidClientId: '657880389882-jju10veckt7h42jj0g655jr86gc20f4k.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({ useProxy: true }),
    // For iOS standalone builds, add native client ID later:
    // iosClientId: '<IOS_CLIENT_ID>',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { idToken, accessToken } = response.authentication || {};
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      signInWithCredential(auth, credential)
        .then((res) => {
          const u = res.user;
          login(u.displayName || u.email || 'User', u.uid);
          navigation.replace('Home');
        })
        .catch((err) => {
          Alert.alert('Login Error', err.message || 'Failed to sign in with Firebase');
        });
    }
  }, [response]);

  useEffect(() => {
    console.log('Google auth request ready:', !!request);
  }, [request]);

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

      {/* Anime Image */}
      <Image
        source={require('../assets/images/simple_tent.png')}
        style={[styles.logo, { width: width * 1.1 }]}
        resizeMode="contain"
      />



      <Text style={styles.title}>Login to Camply</Text>

      {/* Input Boxes */}
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

      {/* Login Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleLogin}
        style={[styles.loginButton, { width: Math.min(width * 0.9, 360) }]}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Google Login Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={async () => {
          if (!request) {
            Alert.alert('Please wait', 'Google sign-in is not ready yet.');
            console.log('Google auth request not ready', { request });
            return;
          }
          try {
            const result = await promptAsync({ useProxy: true });
            console.log('promptAsync result:', result);
          } catch (err) {
            console.error('promptAsync error', err);
            Alert.alert('Sign-in error', err?.message || String(err));
          }
        }}
        style={[styles.googleButton, { width: Math.min(width * 0.9, 360) }]}
      >
        <Image
          source={require('../assets/logo/google_logo.png')}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 18 }}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
  logo: {
    height: 160,
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    color: '#111111',
    fontFamily: 'RobotoSlab_600SemiBold',
    fontSize: 18,
    letterSpacing: 1,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 12,
    backgroundColor: 'transparent',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleText: {
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
    fontSize: 16,
  },
  link: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});
