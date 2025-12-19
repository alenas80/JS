import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllReviews } from '../Review/ViewReview'
import { doctors } from '../../doctors';


export default function ProfileScreen({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRating, setSelectedRating] = useState(null);
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        const loadProfile = async () => {
            const savedName = await AsyncStorage.getItem('profile_name');
            const savedEmail = await AsyncStorage.getItem('profile_email');

            if (savedName) setName(savedName);
            if (savedEmail) setEmail(savedEmail);

            if (savedEmail) {
                const allReviews = await getAllReviews();
                const reviewsArray = [];

                for (let doctorId in allReviews) {
                    const doctorReviews = allReviews[doctorId];
                    for (let r of doctorReviews) {
                        if (r.userEmail === savedEmail) {
                            const doctor = doctors.find(d => d.id === Number(doctorId));
                            reviewsArray.push({
                                ...r,
                                doctorId,
                                doctorName: doctor ? doctor.name : 'Неизвестный врач',
                            });
                        }
                    }
                }
                setMyReviews(reviewsArray);
            }
        };
        loadProfile();
    }, []);


    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('profile_name', name);
            await AsyncStorage.setItem('profile_email', email);
        } catch (e) {
            console.error('Ошибка сохранения', e);
        }
    };

    const handleRatingPress = (rating) => {
        setSelectedRating(prev => (prev === rating ? null : rating));
    }

    const filteredMyReviews = myReviews.filter(r => {
        if (!selectedRating) return true;
        return r.rating === selectedRating;
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Назад</Text>
            </TouchableOpacity>

            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{name.charAt(0)}</Text>
            </View>

            <Text style={styles.label}>Имя:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Сохранить</Text>
            </TouchableOpacity>

            <Text style={styles.reviewsTitle}>Мои отзывы:</Text>

            <View style={styles.ratContainer}>
                <Text style={styles.ratLabel}>Рейтинг:</Text>
                <TouchableOpacity style={[styles.ratButton, selectedRating === 5 && styles.ratButtonActive,]} onPress={() => handleRatingPress(5)}>
                    <Text style={styles.ratButtonText}>5✩</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.ratButton, selectedRating === 4 && styles.ratButtonActive,]} onPress={() => handleRatingPress(4)}>
                    <Text style={styles.ratButtonText}>4✩</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.ratButton, selectedRating === 3 && styles.ratButtonActive,]} onPress={() => handleRatingPress(3)}>
                    <Text style={styles.ratButtonText}>3✩</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.ratButton, selectedRating === 2 && styles.ratButtonActive,]} onPress={() => handleRatingPress(2)}>
                    <Text style={styles.ratButtonText}>2✩</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.ratButton, selectedRating === 1 && styles.ratButtonActive,]} onPress={() => handleRatingPress(1)}>
                    <Text style={styles.ratButtonText}>1✩</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.stats}>Всего отзывов: {myReviews.length}</Text>

            <FlatList
                data={filteredMyReviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const doctor = doctors.find(d => d.id === Number(item.doctorId));

                    return (
                        <TouchableOpacity style={styles.reviewCard} onPress={() => {
                                if (doctor) {
                                    navigation.navigate('Details', { doctor });
                                }
                            }}
                        >
                            <Text style={styles.reviewText}>Врач: {item.doctorName}</Text>
                            <Text style={styles.reviewText}>Рейтинг: {item.rating}✩</Text>
                            <Text style={styles.reviewText}>Комментарий: {item.text}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Auth')}>
                <Text style={styles.logoutButtonText}>Выйти из аккаунта</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#902be84e',
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#8f2be8c8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        alignSelf: 'center',
    },

    avatarText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
    },

    label: {
        marginTop: 8,
        fontWeight: '600',
    },

    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginTop: 4,
    },

    saveButton: {
        backgroundColor: '#8f2be8c8',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
    },

    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    ratContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    ratLabel: {
        marginRight: 8,
    },

    ratButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: '#ffffffc8',
        borderColor: '#ffffffc8',
        marginHorizontal: 4,
    },

    ratButtonText: {
        color: '#000000ff',
    },

    ratButtonActive: {
        backgroundColor: '#8f2be8c8',
        borderColor: '#8f2be8c8',
    },

    reviewsTitle: {
        marginTop: 24,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    logoutButton: {
        position: 'absolute',
        left: 16,
        bottom: 16,
        backgroundColor: '#8f2be8c8',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignItems: 'center',
    },

    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },

    stats: {
        fontSize: 14,
        color: '#555',
        marginVertical: 8,
    },

    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        elevation: 1,
    },

    reviewDoctor: {
        fontWeight: '600',
        fontSize: 15,
        color: '#222',
    },


    reviewRating: {
        fontWeight: '600',
        marginBottom: 4,
    },

    reviewText: {
        color: '#444',
        marginBottom: 6,
    },

    reviewLink: {
        color: '#8f2be8c8',
        fontWeight: '600',
    },

    empty: {
        textAlign: 'center',
        color: '#888',
        marginTop: 12,
    },


});
