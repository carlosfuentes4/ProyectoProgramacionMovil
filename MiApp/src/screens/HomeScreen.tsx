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
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen({ navigation }: any) {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const { user } = useAuth();
  const { colors } = useTheme();

  const styles = getStyles(colors);

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
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.background} />
      <View style={styles.headerContainer}>
        <Text style={styles.subtitleText}>Mis Recetas</Text>
      </View>

      <FlatList
        data={recetas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="restaurant-outline" size={48} color={colors.textMuted} />
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

const getStyles = (colors: any) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: { 
    paddingHorizontal: 24, 
    marginTop: 20,
    marginBottom: 15 
  },
  subtitleText: { fontSize: 24, fontWeight: "bold", color: colors.text },
  listContainer: { paddingHorizontal: 24, paddingBottom: 90 },
  emptyContainer: { alignItems: "center", marginTop: 40 },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textSecondary,
    marginTop: 12,
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});