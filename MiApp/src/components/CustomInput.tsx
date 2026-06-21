import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CustomInput({ label, placeholder, value, onChangeText, secureTextEntry, ...props }: any) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: colors.text },
  input: { 
    borderWidth: 1, 
    borderColor: colors.border, 
    padding: 10, 
    borderRadius: 8,
    color: colors.text,
    backgroundColor: colors.inputBg,
  },
});