import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Colors } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/background/camp.jpg')} style={styles.bg} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.logo}>⛺️ Campify</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.outline]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.buttonText, styles.outlineText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  bg: {
    flex: 1,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 16,
    color: Colors.forest,
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
    fontSize: 16,
    fontWeight: '600',
  },
  outline: {
    backgroundColor: Colors.tan,
    borderWidth: 1,
    borderColor: Colors.forest,
  },
  outlineText: {
    color: Colors.forest,
  },
});