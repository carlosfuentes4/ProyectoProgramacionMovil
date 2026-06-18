import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.text}>Mi Perfil de Chef</Text>
      </View>

      <CustomButton
        title="Cerrar Sesión"
        onPress={() => logout()}
        variant="tertiary"
        iconName="log-out-outline"
        style={styles.logoutButtonOverride}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold", color: "#0F172A" },
  logoutButtonOverride: {
    margin: 24,
    backgroundColor: "#EF4444",
  },
});
