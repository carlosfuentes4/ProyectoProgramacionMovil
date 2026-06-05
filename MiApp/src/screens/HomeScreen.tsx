import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

//Simulacion de datos de recetas
const RECETAS_DUMMY = [
  {
    id: '1',
    titulo: 'Espagueti a la Bolonesa',
    categoria: 'Almuerzo',
    tiempo: '30 min',
    dificultad: 'Facil'
  },
  {
    id: '2',
    titulo: 'Panqueques de Avena',
    categoria: 'Desayuno',
    tiempo: '15 min',
    dificultad: 'Facil'
  },
  {
    id: '3',
    titulo: 'Pastel de Chocolate',
    categoria: 'Postre',
    tiempo: '45 min',
    dificultad: 'Media'
  },
  {
    id: '4',
    titulo: 'Tacos de Pollo',
    categoria: 'Cena',
    tiempo: '20 min',
    dificultad: 'Facil'
  }
];

export default function HomeScreen({ navigation }: Props) {

  //Diseño de las tarjetas de receta
  const renderItem = ({ item }: { item: typeof RECETAS_DUMMY[0] }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{item.categoria.toUpperCase()}</Text>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        
        <View style={styles.cardFooter}>
          {/* Icono de reloj para el tiempo */}
          <View style={styles.infoContainer}>
            <Ionicons name="time-outline" size={16} color="#64748B" />
            <Text style={styles.cardInfo}>{item.tiempo}</Text>
          </View>
          
          {/* Icono para la dificultad */}
          <View style={styles.infoContainer}>
            <Ionicons name="stats-chart-outline" size={16} color="#64748B" />
            <Text style={styles.cardInfo}>{item.dificultad}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>¡Hola de nuevo!</Text>
        <Text style={styles.subtitleText}>Mis Recetas Guardadas</Text>
      </View>

      {/*Lista de recetas */}
      <FlatList
        data={RECETAS_DUMMY}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/*Boton temporal de Log Out*/}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
  },
  subtitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Sombras para Android
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6366F1',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardInfo: {
    fontSize: 13,
    color: '#64748B',
  },
  logoutButton: {
    marginVertical: 20,
    alignSelf: 'center',
    padding: 10,
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 15,
  },
});