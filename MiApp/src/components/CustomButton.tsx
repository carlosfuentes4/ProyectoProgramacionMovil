import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, View } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../context/ThemeContext';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  style?: ViewStyle;
  iconName?: keyof typeof Ionicons.glyphMap;
};

export default function CustomButton({ title, onPress, variant = "primary", style, iconName }: ButtonProps) {
  const { colors } = useTheme();
  const styles = getStyles(variant, colors);
  
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        {/* Usamos un contenedor interno para el contenido */}
        <View style={styles.contentContainer}>
            {iconName && <Ionicons name={iconName} size={20} color="white" style={{ marginRight: 8 }} />}
            <Text style={styles.buttonText}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
}

const getStyles = (variant: "primary" | "secondary" | "tertiary", colors: any) => StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: variant === "primary" ? colors.primary : 
                     variant === "secondary" ? colors.secondary : 
                     "#8491A3", // Fallback to default gray for tertiary
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});