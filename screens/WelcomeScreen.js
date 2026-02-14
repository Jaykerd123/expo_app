import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Oswald_600SemiBold } from '@expo-google-fonts/oswald';

export default function WelcomeScreen({ navigation }) {
  const { width } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    Oswald_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../assets/background/initial_page_bg.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        
        {/* Logo */}
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/logo/heya_logo.png')}
            style={[
              styles.logo,
              { width: Math.min(width * 0.85, 360) }
            ]}
            resizeMode="contain"
          />
        </View>

        {/* Description */}
        <View style={styles.textSection}>
          <Text style={styles.description}>
            Discover the perfect campsites, plan your outdoor adventures, and
            connect with fellow campers. Your next great escape awaits!
            {"\n\n"}
            Start exploring nature like never before and create unforgettable
            memories under the stars.
          </Text>
        </View>

        {/* Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Login')}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={['#FF8C42', '#4285F4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40, // 🔥 moved everything higher
  },

  logoSection: {
    alignItems: 'center',
    marginTop: 10,
  },

  logo: {
    height: 240,
    aspectRatio: 1,
  },

  textSection: {
    marginTop: 0,
    paddingHorizontal: 28,
  },

  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Oswald_600SemiBold', // 🔥 camping font
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  buttonSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 40,
  },

  buttonWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
  },

  button: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Oswald_600SemiBold',
  },
});
