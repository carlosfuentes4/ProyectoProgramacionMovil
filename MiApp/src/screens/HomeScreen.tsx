import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import RecipeCard from "../components/RecipeCards";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a la App!</Text>

      <RecipeCard
        title={"Receta 1"}
        description={"Receta de prueba"}
        imageUrl={"https://unsplash.com/es/fotos/verduras-y-carne-en-cuenco-kcA-c3f_3FE"}
        onPress={()=>{console.log("card 1")}}
      />
      <RecipeCard
        title={"Receta 2"}
        description={"Receta de prueba"}
        imageUrl={"https://img.magnific.com/foto-gratis/primer-plano-carne-asada-salsa-verduras-patatas-fritas-plato-sobre-mesa_181624-35847.jpg?semt=ais_hybrid&w=740&q=80"}
        onPress={()=>{console.log("card 2")}}
      />

      <Button
        title="Ir al Login"
        onPress={() => navigation.navigate("Login")} // Apunta a Login
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: { fontSize: 20, marginBottom: 20, fontWeight: "bold" },
});
