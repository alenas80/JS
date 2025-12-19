import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';
import { getReviews } from '../../Review/ViewReview';
import { doctors } from '../../../doctors';


export default function HomeScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('Все');
    const [selectedRating, setSelectedRating] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [doctorStats, setDoctorStats] = useState({});

    useEffect(() => {
        const loadStats = async () => {
            const stats = {};

            for (const doctor of doctors) {
                const reviews = await getReviews(doctor.id);
                const count = reviews.length;

                const rating = count ? (reviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1) : null;

                stats[doctor.id] = {
                    rating,
                    reviewsCount: count,
                };
            }
            setDoctorStats(stats);
        };

        loadStats();
    }, []);


    const searchedDoctors = doctors.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())
    );

    const filteredDoctors = searchedDoctors.filter(d => {
        if (selectedSpecialty !== 'Все' && d.specialty !== selectedSpecialty) {
            return false;
        }
        if (selectedRating) {
            const rating = Number(doctorStats[d.id]?.rating);

            if (!rating) return false;

            const min = selectedRating;      
            const max = selectedRating + 1;   

            if (rating < min || rating >= max) return false;
        }

        return true;
    });

    const specialties = ['Все', ...new Set(doctors.map(d => d.specialty))];

    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        if (sortBy === 'rating') {
            const ratingA = Number(doctorStats[a.id]?.rating || 0);
            const ratingB = Number(doctorStats[b.id]?.rating || 0);
            return ratingB - ratingA;
        }

        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }

        if (sortBy === 'experience') {
            return b.experience - a.experience;
        }

        return 0;
    });


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Список врачей</Text>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.profileIcon}></Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.search}
                placeholder="Введите имя или специальность"
                value={search}
                onChangeText={setSearch}
            />

            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Специальность:</Text>

                <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.selectText}>{selectedSpecialty}</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Выберите специальность</Text>

                        <FlatList
                            data={specialties}
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => {
                                    setSelectedSpecialty(item);
                                    setModalVisible(false);
                                }}
                                >
                                    <Text style={[styles.modalItemText, selectedSpecialty === item && styles.activeItemText,]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Рейтинг:</Text>
                {[5, 4, 3, 2, 1].map(r => (
                    <TouchableOpacity
                        key={r}
                        style={[
                            styles.filterButton,
                            selectedRating === r && styles.filterButtonActive,
                        ]}
                        onPress={() => setSelectedRating(selectedRating === r ? null : r)}
                    >
                        <Text style={styles.filterText}>{r}✩</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.sortRow}>
                <Text style={styles.filterLabel}>Сортировать по:</Text>

                <TouchableOpacity onPress={() => setSortBy('rating')}>
                    <Text style={[styles.sortText, sortBy === 'rating' && styles.activeText]}>Рейтинг</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSortBy('name')}>
                    <Text style={[styles.sortText, sortBy === 'name' && styles.activeText]}>Имя</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSortBy('experience')}>
                    <Text style={[styles.sortText, sortBy === 'experience' && styles.activeText]}>Опыт</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={sortedDoctors}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { doctor: item })}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                        </View>

                        <View style={styles.cardInfo}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.specialty}>{item.specialty}</Text>
                            <Text style={styles.meta}>
                                {doctorStats[item.id]?.rating
                                    ? `${doctorStats[item.id].rating}✩`
                                    : 'Нет оценок'}
                                {' · '}
                                {doctorStats[item.id]?.reviewsCount || 0} отзывов
                                {' · '}
                                Опыт {item.experience} лет
                            </Text>
                            <Text style={styles.about} numberOfLines={2}>{item.about}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#902be84e',
        padding: 16,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },


    search: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 12,
    },

    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    filterLabel: {
        marginRight: 8,
        fontWeight: '600',
    },

    filterButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#ffffffff',
        borderColor: '#fffcfcff',
        marginRight: 6,
    },

    filterButtonActive: {
        backgroundColor: '#8f2be8c8',
        borderColor: '#8f2be8c8',
    },

    filterText: {
        color: '#333',
    },

    sortRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    sortText: {
        marginRight: 12,
        color: '#555',
    },

    activeText: {
        color: '#902be8ff',
        fontWeight: '600',
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        alignItems: 'center',
        elevation: 2,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#8f2be8c8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

    cardInfo: {
        flex: 1,
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
    },

    specialty: {
        color: '#616161ff',
        marginVertical: 2,
    },

    meta: {
        color: '#616161ff',
        fontSize: 13,
    },

    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flex: 1,
        justifyContent: 'space-between',
    },

    selectText: {
        fontSize: 15,
        color: '#333',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '60%',
        padding: 16,
    },

    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },

    modalItem: {
        paddingVertical: 12,
    },

    modalItemText: {
        fontSize: 15,
        color: '#333',
    },

    activeItemText: {
        color: '#8f2be8c8',
        fontWeight: '600',
    },

    about: {
        marginTop: 4,
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },

    profileButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#8f2be8c8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileIcon: {
        fontSize: 18,
        color: '#9d53f9ff',
    },


});
