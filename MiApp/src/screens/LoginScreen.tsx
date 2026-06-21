import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithEmail, signUpWithEmail } = useAuth();
  const { colors } = useTheme();

  const styles = getStyles(colors);

  const handleAuth = async () => {
    try {
      if (esRegistro) {
        await signUpWithEmail(email, password);
        Alert.alert("Éxito", "Cuenta creada.");
        setEsRegistro(false);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <StatusBar barStyle={colors.statusBar} backgroundColor={colors.background} />

          <View style={styles.headerContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.title}>My Cooking Book</Text>
            <Text style={styles.subtitle}>
              Organiza y comparte tus recetas favoritas
            </Text>
          </View>

          <View style={styles.formContainer}>
            <CustomInput
              label="Correo Electrónico"
              placeholder="ejemplo@correo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View>
              <CustomInput
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                title={esRegistro ? "Registrarse" : "Iniciar Sesión"}
                onPress={handleAuth}
                variant="primary"
              />

              <TouchableOpacity
                onPress={() => setEsRegistro(!esRegistro)}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.toggleText}>
                  {esRegistro
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿No tienes cuenta? Regístrate aquí"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  headerContainer: { alignItems: "center", marginBottom: 32 },
  logoImage: { width: 120, height: 120, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: "bold", color: colors.text },
  subtitle: { fontSize: 16, color: colors.textSecondary, textAlign: "center" },
  formContainer: { width: "100%" },
  eyeIcon: { position: "absolute", right: 15, top: 35 }, 
  buttonContainer: { width: "100%", marginTop: 20 },
  toggleText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

