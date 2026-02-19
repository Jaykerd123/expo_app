import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, RobotoSlab_600SemiBold } from '@expo-google-fonts/roboto-slab';

export default function WelcomeScreen({ navigation }) {
  const { width } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    RobotoSlab_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../assets/images/bg_tent.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Dark overlay for readability */}
      <LinearGradient
        colors={['rgba(10,20,50,0.6)', 'rgba(5,10,30,0.95)']}
        style={styles.overlay}
      >
        <View style={styles.container}>

          {/* Top Text Section */}
          <View style={styles.textSection}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.title}>Camply</Text>

            <Text style={styles.subtitle}>
              Connect with people and plan your next escape
              with Camply
            </Text>
          </View>

          {/* Bottom Buttons Section */}
          <View style={styles.buttonSection}>

            {/* Google Button */}
            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.85}
            >
              <Text style={styles.googleText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Email Button */}
            <TouchableOpacity
              style={styles.emailButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.emailText}>
                Continue with Email
              </Text>
            </TouchableOpacity>

            {/* Login Instead */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: 18 }}
            >
              <Text style={styles.loginText}>
                Login instead
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 90,
    paddingBottom: 50,
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  textSection: {
    alignItems: 'center',
  },

  welcome: {
    fontSize: 20,
    color: '#d0d6ff',
    marginBottom: 5,
  },

  title: {
    fontSize: 44,
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 15,
    color: '#cfd8ff',
    textAlign: 'center',
    lineHeight: 22,
  },

  buttonSection: {
    width: '100%',
  },

  googleButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },

  googleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  emailButton: {
    borderWidth: 1.5,
    borderColor: '#ffffff',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },

  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  loginText: {
    color: '#b0b8ff',
    textAlign: 'center',
    fontSize: 14,
  },
});
