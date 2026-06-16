import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useAuth } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [esRegistro, setEsRegistro] = useState(false); // Estado para alternar modo

    const handleAuth = () => {
        if (!email.trim() || !password) {
            Alert.alert('Campos Obligatorios', 'Por favor, completa todos los campos.');
            return;
        }
        if (!email.includes('@')) {
            Alert.alert('Correo Inválido', 'El correo debe contener un "@".');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Contraseña Corta', 'Mínimo 6 caracteres.');
            return;
        }
        
        

        if (esRegistro) {
            Alert.alert('Registro', 'Registro exitoso para ' + email);
            setEsRegistro(false); // Volver a login tras registrar
        } else {
            login(email);
            navigation.replace('Main');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            <View style={styles.headerContainer}>              
                <Image 
                    source={require('../../assets/logo.png')} 
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Text style={styles.logo}>My Cooking Book</Text>
                <Text style={styles.subtitle}>Organiza y comparte tus recetas favoritas</Text>
            </View>

            <View style={styles.formContainer}>
                <CustomInput
                    label="Correo Electrónico"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChangeText={setEmail}
                />

                <CustomInput
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={esRegistro ? "Registrarse" : "Iniciar Sesión"}
                        onPress={handleAuth}
                        variant="primary"
                    />

                    <TouchableOpacity onPress={() => setEsRegistro(!esRegistro)} style={{ marginTop: 20 }}>
                        <Text style={styles.toggleText}>
                            {esRegistro 
                                ? "¿Ya tienes cuenta? Inicia sesión" 
                                : "¿No tienes cuenta? Regístrate aquí"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoImage: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    toggleText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '600',
    }
});