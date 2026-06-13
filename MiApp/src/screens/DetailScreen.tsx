import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../services/supabase";
import CustomButton from "../components/CustomButton";

export default function DetailScreen() {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const { receta } = route.params as { receta: any };

  const confirmarBorrado = () => {
    Alert.alert(
      "Borrar Receta",
      "¿Estás seguro de que quieres eliminar esta receta para siempre?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          style: "destructive",
          onPress: eliminarReceta,
        },
      ],
    );
  };

  const eliminarReceta = async () => {
    try {
      const { error } = await supabase
        .from("recetas")
        .delete()
        .eq("id", receta.id);

      if (error) throw error;

      Alert.alert("Eliminada", "La receta ha sido borrada con éxito.");
      navigation.popToTop();
    } catch (error: any) {
      Alert.alert("Error al borrar", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      <Image source={{ uri: receta.imagen_url }} style={styles.image} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{receta.titulo}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={18} color="#64748B" />
            <Text style={styles.metaText}>{receta.tiempo || "30 min"}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="flame-outline" size={18} color="#E11D48" />
            <Text style={styles.metaText}>{receta.dificultad || "Fácil"}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.categoryBadge}>
              {receta.categoria || "Almuerzo"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <Text style={styles.bodyText}>{receta.ingredientes}</Text>

        <Text style={styles.sectionTitle}>Preparación</Text>
        <Text style={styles.bodyText}>{receta.instrucciones}</Text>

        {/*Borrar y Editar*/}
        <View style={styles.actionRow}>
          <CustomButton
            title="Borrar"
            iconName="trash-outline"
            variant="tertiary"
            style={{ backgroundColor: "#DC2626", flex: 1 }}
            onPress={confirmarBorrado}
          />
          <CustomButton
            title="Editar"
            iconName="create-outline"
            variant="primary"
            style={{ backgroundColor: "#2563EB", flex: 1, marginLeft: 10 }}
            onPress={() => navigation.navigate("ManageRecipe", { receta })}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  image: { width: "100%", height: 250 },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  contentContainer: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#333", marginBottom: 10 },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 14, color: "#64748B", fontWeight: "500" },
  categoryBadge: {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E11D48",
    marginTop: 15,
    marginBottom: 5,
  },
  bodyText: { fontSize: 16, color: "#4B5563", lineHeight: 24 },
  actionRow: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
});
