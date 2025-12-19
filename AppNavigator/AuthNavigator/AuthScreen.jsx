import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Отзывы о врачах</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Вход</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#a600ff3c',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  button: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#8f2be8c8',
    marginBottom: 16,
    alignItems: 'center',
  },

  secondaryButton: {
    backgroundColor: '#8f2be8c8',
  },

  buttonText: {
    color: '#000000ff',
    fontSize: 16,
    fontWeight: '600',
  },

});