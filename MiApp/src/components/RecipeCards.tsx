import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ViewStyle } from 'react-native';

interface RecipeCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function RecipeCard({ title, description, imageUrl, onPress, style }: RecipeCardProps) {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});
