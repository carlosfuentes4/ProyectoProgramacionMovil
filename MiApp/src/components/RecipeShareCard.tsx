import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const RecipeShareCard = ({ receta }: { receta: any }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: receta.imagen_url }} style={styles.image} />
      <Text style={styles.title}>{receta.titulo}</Text>
      
      <Text style={styles.label}>Ingredientes:</Text>
      <Text style={styles.text}>{receta.ingredientes}</Text>
      
      <Text style={styles.label}>Preparación:</Text>
      <Text style={styles.text}>{receta.instrucciones}</Text>
      
      <Text style={styles.footer}>¡Receta compartida desde My Cooking Book!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'column', 
  },
  image: { 
    width: '100%', 
    height: 200, 
    borderRadius: 10,
    marginBottom: 10 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#000',
    marginVertical: 10 
  },
  label: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginTop: 15,
    marginBottom: 5,
    color: '#333'
  },
  text: { 
    fontSize: 14, 
    color: '#333',
    lineHeight: 20,
  },
  footer: { 
    marginTop: 30,
    textAlign: 'center', 
    color: '#888', 
    fontStyle: 'italic' 
  }
});