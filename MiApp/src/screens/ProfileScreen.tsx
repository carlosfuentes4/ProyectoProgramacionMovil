import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.text}>Mi Perfil de Chef</Text>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => {
          const rootStack = navigation.getParent();
          if (rootStack) {
            rootStack.navigate('Login');
          }
        }}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  logoutButton: {
    margin: 24,
    padding: 14,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
});