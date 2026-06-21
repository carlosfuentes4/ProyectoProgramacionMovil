import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../context/ThemeContext';

interface RecipeCardProps {
  title: string;
  category: string;
  time: string;
  difficulty: string;
  imageUrl: string;
  onPress: () => void;
}

export default function RecipeCard({ title, category, time, difficulty, imageUrl, onPress }: RecipeCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        
        <View style={styles.footer}>
          <View style={styles.info}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.infoText}>{time}</Text>
          </View>
          <View style={styles.info}>
            <Ionicons name="stats-chart-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.infoText}>{difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150, 
  },
  content: {
    padding: 15,
  },
  category: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.secondary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    gap: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});