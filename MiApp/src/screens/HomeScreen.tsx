import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCards";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";

type Props = {
  navigation: any;
  route: any;
};

export default function HomeScreen({ navigation }: Props) {
  // 2. Estados para controlar las recetas de la BD y la animación de carga
  const [recetas, setRecetas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {user}=useAuth();
  const {login}=useAuth();

  // traer las recetas desde Supabase
  const obtenerRecetas = async () => {
    try {
      setLoading(true);
      
      //consulta a la tabla 'recetas' de la más nueva a la más vieja
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setRecetas(data);
      }
    } catch (error: any) {
      console.error("Error al obtener recetas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect carga las recetas automáticamente al abrir la pantalla
  useEffect(() => {
    obtenerRecetas();

    const unsubsribe = navigation.addListener("focus", () => {
      obtenerRecetas();
    });

    return unsubsribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>¡Hola {user?.email}!</Text>
        <Text style={styles.subtitleText}>Mis Recetas Guardadas</Text>
      </View>

      {/*Señala que esta cargando*/}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E11D48" />
          <Text style={styles.loadingText}>Cargando tus recetas...</Text>
        </View>
      ) : (
        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          // Si la base de datos está vacía, muestra este mensaje en pantalla
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="restaurant-outline" size={48} color="#94A3B8" />
              <Text style={styles.emptyText}>Aún no tienes recetas guardadas.</Text>
              <Text style={styles.emptySubtext}>¡Presiona el botón de (+) para agregar la primera!</Text>
            </View>
          }
          renderItem={({ item }) => (
            <RecipeCard
              title={item.titulo}
              category={item.categoria || "General"}
              time={item.tiempo || "N/A"}
              difficulty={item.dificultad || "Fácil"}
              imageUrl={item.imagen_url}
              onPress={() => navigation.navigate("Detail", { receta: item })}
            />
          )}
        />
      )}

      {/* Botón para Agregar Receta */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => navigation.navigate("ManageRecipe")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: StatusBar.currentHeight,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: 15,
  },
  welcomeText: { 
    fontSize: 16, 
    color: "#64748B" 
  },
  subtitleText: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#0F172A" 
  },
  listContainer: { 
    paddingHorizontal: 24, 
    paddingBottom: 90 
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 16
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 20
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#475569",
    marginTop: 12
  },
  emptySubtext: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 4
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#E11D48", 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});