import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen'; 

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // Este padding evita que tu Login se pegue al borde de la cámara de tu celular
    paddingTop: StatusBar.currentHeight || 40, 
  },
});