import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const validateEmail = (email) => {
        if (!email || email.trim() === '') {
            return 'Поле не может быть пустым';
        } else if (typeof email === 'string' && email.includes('@') && email.includes('.')) {
            return null;
        } else {
            return 'Введите корректный email';
        }
    };

    const handleRegister = () => {
        let valid = true;

        const emailValidation = validateEmail(email);

        if (emailValidation) {
            setEmailError(emailValidation);
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password || password.length < 6) {
            setPasswordError('Пароль должен быть минимум 6 символов');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmError('Пароли не совпадают');
            valid = false;
        } else {
            setConfirmError('');
        }

        if (valid) {
            navigation.replace('Auth');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>

            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='#999'
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder='Пароль'
                placeholderTextColor='#999'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder='Подтвердить пароль'
                placeholderTextColor='#999'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {confirmError ? <Text style={styles.error}>{confirmError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Auth')}>
                <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
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
        marginBottom: 12,
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