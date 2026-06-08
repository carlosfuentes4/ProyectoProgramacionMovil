import React from "react";
import {StyleSheet,Text,View,SafeAreaView,FlatList,StatusBar,TouchableOpacity,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import RecipeCard from "../components/RecipeCards";
import { useAuth } from "../context/AuthContext";

type Props = {
  navigation: any;
  route: any;
};

const RECETAS_SIMULADAS = [
  {
    id: "1",
    titulo: "Espagueti a la Bolonesa",
    categoria: "Almuerzo",
    tiempo: "30 min",
    dificultad: "Fácil",
    imageUrl:
      "https://www.laespanolaaceites.com/wp-content/uploads/2019/05/espaguetis-a-la-bolonesa-1080x671.jpg",
  },
  {
    id: "2",
    titulo: "Panqueques de Avena",
    categoria: "Desayuno",
    tiempo: "15 min",
    dificultad: "Fácil",
    imageUrl:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "3",
    titulo: "Pastel de Chocolate",
    categoria: "Postre",
    tiempo: "45 min",
    dificultad: "Media",
    imageUrl:
      "https://i.ytimg.com/vi/Bk3k3vniLWI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDDH5lOhWYvPwi3TO3MrQy0xokg5A",
  },
];

export default function HomeScreen({ navigation }: Props) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>¡Hola de nuevo, {user?.email}!</Text>
        <Text style={styles.subtitleText}>Mis Recetas Guardadas</Text>
      </View>

      <FlatList
        data={RECETAS_SIMULADAS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.titulo}
            category={item.categoria}
            time={item.tiempo}
            difficulty={item.dificultad}
            imageUrl={item.imageUrl}
            onPress={() => console.log("Click en " + item.titulo)}
          />
        )}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
  welcomeText: { fontSize: 16, color: "#64748B" },
  subtitleText: { fontSize: 24, fontWeight: "bold", color: "#0F172A" },
  listContainer: { paddingHorizontal: 24, paddingBottom: 20 },
  logoutButton: {
    margin: 24,
    padding: 14,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#EF4444", fontWeight: "bold" },
});
