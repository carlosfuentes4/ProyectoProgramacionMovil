import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme, ThemeMode } from "../context/ThemeContext";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const { colors, themeMode, setThemeMode } = useTheme();

  const styles = getStyles(colors);

  const themeOptions: { mode: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { mode: "light", label: "Claro", icon: "sunny-outline" },
    { mode: "dark", label: "Oscuro", icon: "moon-outline" },
    { mode: "system", label: "Sistema", icon: "settings-outline" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={80} color={colors.secondary} />
        </View>
        <Text style={styles.title}>Mi Perfil de Chef</Text>
        {user?.email && <Text style={styles.emailText}>{user.email}</Text>}
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionHeader}>Apariencia</Text>
        <View style={styles.card}>
          <Text style={styles.cardSubtitle}>Tema de la aplicación</Text>
          <View style={styles.themeSelector}>
            {themeOptions.map((opt) => {
              const isActive = themeMode === opt.mode;
              return (
                <TouchableOpacity
                  key={opt.mode}
                  style={[
                    styles.selectorButton,
                    isActive && styles.activeSelectorButton,
                  ]}
                  onPress={() => setThemeMode(opt.mode)}
                >
                  <Ionicons 
                    name={opt.icon} 
                    size={20} 
                    color={isActive ? "#FFFFFF" : colors.textSecondary} 
                    style={{ marginBottom: 4 }} 
                  />
                  <Text
                    style={[
                      styles.selectorText,
                      isActive && styles.activeSelectorText,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Cerrar Sesión"
          onPress={() => logout()}
          variant="tertiary"
          iconName="log-out-outline"
          style={styles.logoutButtonOverride}
        />
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: colors.text 
  },
  emailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  settingsSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 15,
  },
  themeSelector: {
    flexDirection: "row",
    gap: 8,
  },
  selectorButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.selectorBg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeSelectorButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectorText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.selectorText,
  },
  activeSelectorText: {
    color: "#FFFFFF",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  logoutButtonOverride: {
    backgroundColor: "#EF4444",
  },
});
