import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

export const lightTheme = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  primary: "#E11D48",
  secondary: "#6366F1",
  success: "#10B981",
  danger: "#EF4444",
  placeholder: "#94A3B8",
  tabBarBg: "#FFFFFF",
  tabBarBorder: "#E2E8F0",
  statusBar: "dark-content" as const,
  buttonText: "#FFFFFF",
  inputBg: "#FFFFFF",
  selectorBg: "#E2E8F0",
  selectorText: "#475569",
  cardShadow: "#000",
};

export const darkTheme = {
  background: "#0F172A",
  card: "#1E293B",
  text: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#64748B",
  border: "#334155",
  primary: "#FB7185", // Lightened Rose for dark theme readability
  secondary: "#818CF8", // Lightened Indigo
  success: "#34D399",
  danger: "#F87171",
  placeholder: "#64748B",
  tabBarBg: "#1E293B",
  tabBarBorder: "#334155",
  statusBar: "light-content" as const,
  buttonText: "#0F172A", // Dark text for lightened button background
  inputBg: "#1E293B",
  selectorBg: "#334155",
  selectorText: "#CBD5E1",
  cardShadow: "#000",
};

export type ThemeType = "light" | "dark";
export type ThemeMode = "light" | "dark" | "system";

export type ThemeColors = Omit<typeof lightTheme, "statusBar"> & {
  statusBar: "dark-content" | "light-content" | "default";
};

type ThemeContextType = {
  themeMode: ThemeMode;
  theme: ThemeType;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");

  // Determine storage key based on current user email or 'guest'
  const getStorageKey = () => {
    const userEmail = user?.email || "guest";
    return `@theme_mode:${userEmail}`;
  };

  // Load theme preference whenever the user status changes
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const key = getStorageKey();
        const savedMode = await AsyncStorage.getItem(key);
        if (savedMode) {
          setThemeModeState(savedMode as ThemeMode);
        } else {
          setThemeModeState("system");
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
      }
    };

    loadThemePreference();
  }, [user]);

  // Resolve the actual theme ('light' or 'dark')
  const activeTheme: ThemeType =
    themeMode === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;

  const colors: ThemeColors = activeTheme === "dark" ? darkTheme : lightTheme;
  const isDark = activeTheme === "dark";

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      const key = getStorageKey();
      await AsyncStorage.setItem(key, mode);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const toggleTheme = async () => {
    const nextMode: ThemeMode = activeTheme === "light" ? "dark" : "light";
    await setThemeMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme: activeTheme,
        colors,
        isDark,
        toggleTheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
