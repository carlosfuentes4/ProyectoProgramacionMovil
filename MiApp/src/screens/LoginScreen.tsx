import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButtom';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email.includes('@') || password.trim()===''){
            Alert.alert('alert', 'Los campos deben ser correctos');
            return;
        }
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>My Cooking Book</Text>
                <Text style={styles.subtitle}>Organiza y comparte tus recetas favoritas</Text>
            </View>

            <View style={styles.formContainer}>
                <CustomInput
                    type="email"
                    label="Correo Electrónico"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChangeText={setEmail}
                />

                <CustomInput
                    type="password"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Iniciar Sesión"
                        onPress={handleLogin}
                        variant="primary"
                    />
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
        marginBottom: 40,
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
    }
});