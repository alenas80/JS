import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            const savedEmail = await AsyncStorage.getItem('userEmail');
            if (savedEmail) {
                navigation.replace('Home');
            }
        };
        checkSession();
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Заполните все поля');
            return;
        }
        await AsyncStorage.setItem('userEmail', email); 
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Войти</Text>

            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='#999'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder='Пароль'
                placeholderTextColor='#999'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#a600ff3c',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    input: {
        width: '100%',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        marginBottom: 4,
        fontSize: 16,
    },

    error: {
        width: '100%',
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
    },

    button: {
        width: '100%',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#8f2be8c8',
        marginBottom: 16,
        alignItems: 'center',
    },

    buttonText: {
        color: '#000000ff',
        fontSize: 16,
        fontWeight: '600',
    },

    linkText: {
        color: '#0000009c',
        fontSize: 14,
        marginTop: 16,
    },
});
