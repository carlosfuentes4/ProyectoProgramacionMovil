import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCards";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }: any) {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const { user } = useAuth();

  const obtenerRecetas = async () => {
    setCargando(true);
    try {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (!supabaseUser) {
        setCargando(false);
        return;
      }

      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("user_id", supabaseUser.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecetas(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerRecetas();
    const unsubscribe = navigation.addListener("focus", obtenerRecetas);
    return unsubscribe;
  }, [navigation]);

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#E11D48" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.headerContainer}>
        <Text style={styles.subtitleText}>Mis Recetas</Text>
      </View>

      <FlatList
        data={recetas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="restaurant-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyText}>Aún no tienes recetas.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            title={item.titulo}
            category={item.categoria || "General"}
            time={item.tiempo || "N/A"}
            difficulty={item.dificultad || "Fácil"}
            imageUrl={item.imagen_url}
            onPress={() => navigation.navigate('Detail', { receta: item })}
          />
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('ManageRecipe', {})}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  headerContainer: { 
    paddingHorizontal: 24, 
    marginTop: 20,
    marginBottom: 15 
  },
  subtitleText: { fontSize: 24, fontWeight: "bold", color: "#0F172A" },
  listContainer: { paddingHorizontal: 24, paddingBottom: 90 },
  emptyContainer: { alignItems: "center", marginTop: 40 },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#475569",
    marginTop: 12,
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
  },
});