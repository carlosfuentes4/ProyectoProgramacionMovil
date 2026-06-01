import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, KeyboardTypeOptions, TextInputProps } from "react-native";
import React from 'react';

type InputProps = TextInputProps & {
    type?: "text" | "email" | "password";
    label?: string;
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
};

export default function CustomInput({
    type = "text",
    label,
    placeholder,
    value,
    onChange,
    style,
    ...rest
}: InputProps) {
    const [isSecureText, setIsSecureText] = useState(type === 'password');
    const isPasswordField = type === 'password';

    const icon: typeof MaterialIcons["name"] | undefined =
        type === "email" ? 'alternate-email' :
        type === "password" ? 'lock' : undefined;

    const keyboardType: KeyboardTypeOptions =
        type === "email" ? 'email-address' : 'default';

    const getError = () => {
        if (!value) return undefined;
        if (type === 'email' && !value.includes('@')) return 'Correo inválido';
        if (type === 'password' && value.length < 4) return 'La contraseña es muy débil';
        return undefined;
    };

    const error = getError();

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            
            <View style={[styles.inputContainer, error ? styles.inputContainerError : null]}>
                {icon && (
                    <MaterialIcons 
                        name={icon as any} 
                        size={20} 
                        color={error ? '#E74C3C' : '#64748B'} 
                        style={styles.leftIcon} 
                    />
                )}
                
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    value={value}
                    onChangeText={onChange}
                    style={[styles.input, style]}
                    secureTextEntry={isSecureText}
                    keyboardType={keyboardType}
                    {...rest}
                />

                {isPasswordField && (
                    <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)} style={styles.rightIcon}>
                        <Ionicons name={isSecureText ? "eye" : "eye-off"} size={22} color="#64748B" />
                    </TouchableOpacity>
                )}
            </View>
            
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 14,
        width: '100%',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#334155', 
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#F8FAFC', 
        borderColor: '#CBD5E1', 
        paddingHorizontal: 12,
    },
    inputContainerError: {
        borderColor: '#E74C3C',
        backgroundColor: '#FCE4D6',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: '#0F172A',
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        padding: 4,
    },
    errorText: {
        color: '#E74C3C',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
});