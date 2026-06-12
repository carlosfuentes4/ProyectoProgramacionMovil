import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../services/supabase";

type Props = {
  navigation: any;
  route: any;
};

export default function ManageRecipeScreen({ navigation, route }: Props) {
  // AJUSTE 1: Detectamos si venimos desde el botón de "Editar" de la pantalla de detalles
  const recetaEditar = route.params?.receta;
  const esEdicion = !!recetaEditar;

  const [titulo, setTitulo] = useState(recetaEditar?.titulo || "");
  const [categoria, setCategoria] = useState(recetaEditar?.categoria || "Almuerzo");
  const [tiempo, setTiempo] = useState(recetaEditar?.tiempo || "30 min");
  const [dificultad, setDificultad] = useState(recetaEditar?.dificultad || "Fácil");
  const [ingredientes, setIngredientes] = useState(recetaEditar?.ingredientes || "");
  const [instrucciones, setInstrucciones] = useState(recetaEditar?.instrucciones || "");
  const [imagenUrl, setImagenUrl] = useState<string | null>(recetaEditar?.imagen_url || null);
  const [guardando, setGuardando] = useState(false);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tus fotos.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets[0].uri) {
      setImagenUrl(resultado.assets[0].uri);
    }
  };

  const guardarReceta = async () => {
    if (!titulo || !ingredientes || !instrucciones) {
      Alert.alert("Campos incompletos", "Por favor llena el título, ingredientes e instrucciones.");
      return;
    }

    try {
      setGuardando(true);
      let finalImageUrl = imagenUrl || "https://via.placeholder.com/150";

      // Solo sube una nueva imagen si el usuario la seleccionó desde la galería en esta sesión (comienza con file://)
      if (imagenUrl && imagenUrl.startsWith("file://")) {
        const fileName = `${Date.now()}_receta.jpg`;
        const formData = new FormData();
        formData.append("file", {
          uri: imagenUrl,
          name: fileName,
          type: "image/jpeg",
        } as any);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("recetas-imagenes")
          .upload(fileName, formData);

        if (uploadError) throw uploadError;

        if (uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from("recetas-imagenes")
            .getPublicUrl(fileName);
          finalImageUrl = publicUrlData.publicUrl;
        }
      }

      // Estructuramos el objeto que va para Supabase
      const datosReceta = {
        titulo,
        categoria,
        tiempo,
        dificultad,
        ingredientes,
        instrucciones,
        imagen_url: finalImageUrl,
      };

      if (esEdicion) {
        const { error } = await supabase
          .from("recetas")
          .update(datosReceta)
          .eq("id", recetaEditar.id);

        if (error) throw error;
        Alert.alert("¡Éxito!", "Receta actualizada correctamente.");
      } else {
        const { error } = await supabase
          .from("recetas")
          .insert([datosReceta]);

        if (error) throw error;
        Alert.alert("¡Éxito!", "Receta guardada correctamente.");
      }

      navigation.popToTop();
    } catch (error: any) {
      Alert.alert("Error al guardar", error.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* AJUSTE 3: Cambia el título de la cabecera dinámicamente */}
        <Text style={styles.headerTitle}>{esEdicion ? "Editar Receta" : "Nueva Receta"}</Text>

        {/* Zona de Imagen */}
        <TouchableOpacity style={styles.imagePicker} onPress={seleccionarImagen}>
          {imagenUrl ? (
            <Image source={{ uri: imagenUrl }} style={styles.previewImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Ionicons name="camera-outline" size={40} color="#94A3B8" />
              <Text style={styles.uploadText}>Añadir Foto del Platillo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/*Título*/}
        <Text style={styles.label}>Nombre del Platillo</Text>
        <TextInput style={styles.input} placeholder="Ej. Tacos al Pastor" value={titulo} onChangeText={setTitulo} />

        {/*Categoría*/}
        <Text style={styles.label}>Categoría</Text>
        <View style={styles.rowButtons}>
          {["Desayuno", "Almuerzo", "Postre"].map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.selectorButton, categoria === cat && styles.activeButton]} 
              onPress={() => setCategoria(cat)}
            >
              <Text style={[styles.selectorText, categoria === cat && styles.activeText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/*Selectores de Tiempo*/}
        <Text style={styles.label}>Tiempo de Preparación</Text>
        <View style={styles.rowButtons}>
          {["15 min", "30 min", "45 min", "1 hr+"].map((t) => (
            <TouchableOpacity 
              key={t} 
              style={[styles.selectorButton, tiempo === t && styles.activeButton]} 
              onPress={() => setTiempo(t)}
            >
              <Text style={[styles.selectorText, tiempo === t && styles.activeText]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/*Selectores de Dificultad*/}
        <Text style={styles.label}>Dificultad</Text>
        <View style={styles.rowButtons}>
          {["Fácil", "Media", "Difícil"].map((dif) => (
            <TouchableOpacity 
              key={dif} 
              style={[styles.selectorButton, dificultad === dif && styles.activeButton]} 
              onPress={() => setDificultad(dif)}
            >
              <Text style={[styles.selectorText, dificultad === dif && styles.activeText]}>{dif}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/*Ingredientes*/}
        <Text style={styles.label}>Ingredientes</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Escribe cada ingrediente separado por comas..." 
          multiline 
          numberOfLines={4}
          value={ingredientes} 
          onChangeText={setIngredientes} 
        />

        {/*Instrucciones*/}
        <Text style={styles.label}>Preparación / Pasos</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="1. Picar verduras...&#10;2. Cocinar a fuego lento..." 
          multiline 
          numberOfLines={5}
          value={instrucciones} 
          onChangeText={setInstrucciones} 
        />

        {/*Boton de Guardar*/}
        <TouchableOpacity style={styles.saveButton} onPress={guardarReceta} disabled={guardando}>
          {/* AJUSTE 4: Cambia el texto del botón según la acción */}
          {guardando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>{esEdicion ? "Actualizar Cambios" : "Guardar Receta"}</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    backgroundColor: "#F8FAFC",
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 20,
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  imagePicker: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    backgroundColor: "#EDF2F7",
    overflow: "hidden",
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1E293B",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  rowButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  selectorButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
  },
  activeButton: {
    backgroundColor: "#E11D48",
  },
  selectorText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
  },
  activeText: {
    color: "#FFF",
  },
  saveButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
    elevation: 2,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});