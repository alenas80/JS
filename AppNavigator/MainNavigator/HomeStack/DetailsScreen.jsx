import React, { useState, useEffect } from 'react'; import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddReviewModal from '../../Review/AddReview';
import { getReviews, addReview, deleteReview, updateReview } from '../../Review/ViewReview';

export default function DetailScreen({ route, navigation }) {
    const { doctor } = route.params;

    const [reviews, setReviews] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [sortType, setSortType] = useState('all');
    const [page, setPage] = useState(1);
    const [editingReview, setEditingReview] = useState(null);

    const pageSize = 3;

    useEffect(() => {
        const loadData = async () => {
            const email = await AsyncStorage.getItem('userEmail');
            setUserEmail(email);

            const loadedReviews = await getReviews(doctor.id);
            setReviews(loadedReviews);
        };
        loadData();
    }, [doctor.id]);

    const handleAddReview = async (newReview) => {
        await addReview(doctor.id, newReview);
        setReviews(prev => [newReview, ...prev]);
    };

    const handleDeleteReview = async (reviewId) => {
        const updatedReviews = await deleteReview(doctor.id, reviewId, userEmail);
        setReviews(updatedReviews);
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortType === 'date') return new Date(b.visitDate) - new Date(a.visitDate);
        if (sortType === 'relevance') return b.text.length - a.text.length;
        return 0;
    });

    const paginatedReviews = sortedReviews.slice(0, page * pageSize);

    const loadMoreReviews = () => {
        if (page * pageSize < sortedReviews.length) setPage(prev => prev + 1);
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        setModalVisible(true);
    };

    const handleSubmitReview = async (reviewData) => {
        if (editingReview) {
            const updated = {
                ...editingReview,
                ...reviewData,
            };

            const updatedReviews = await updateReview(
                doctor.id,
                updated,
                userEmail
            );

            if (updatedReviews) {
                setReviews(updatedReviews);
            }
        } else {
            const newReview = {
                ...reviewData,
                id: Date.now(),
                userEmail,
            };

            const updatedReviews = await addReview(doctor.id, newReview);
            setReviews(updatedReviews);
        }

        setEditingReview(null);
        setModalVisible(false);
    };



    const averageRating =
        reviews.length === 0
            ? 0
            : (
                reviews.reduce((sum, r) => sum + r.rating, 0) /
                reviews.length
            ).toFixed(1);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.back}>← Назад</Text>
                </TouchableOpacity>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.info}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {doctor.name.charAt(0)}
                    </Text>
                </View>

                <Text style={styles.name}>{doctor.name}</Text>
                <Text style={styles.specialty}>{doctor.specialty}</Text>

                <Text style={styles.meta}>
                    {averageRating}✩ · {reviews.length} отзывов · Опыт {doctor.experience} лет
                </Text>

                <Text style={styles.about}>{doctor.about}</Text>
            </View>

            <Text style={styles.sectionTitle}>Отзывы</Text>
            <View style={styles.sortRow}>
                <TouchableOpacity onPress={() => setSortType('date')}>
                    <Text style={[styles.sortText, sortType === 'date' && styles.activeSort]}>По дате</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSortType('relevance')}>
                    <Text style={[styles.sortText, sortType === 'relevance' && styles.activeSort]}>По релевантности</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={paginatedReviews}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.empty}>Пока нет отзывов</Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <Text style={styles.reviewAuthor}>{item.userEmail}</Text>
                        <Text style={styles.reviewRating}>{item.rating}✩</Text>
                        <Text style={styles.reviewText}>{item.text}</Text>

                        {item.userEmail === userEmail && (
                            <View style={{ flexDirection: 'row', marginTop: 6 }}>
                                <TouchableOpacity onPress={() => handleEditReview(item)}>
                                    <Text style={styles.edit}>Редактировать</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleDeleteReview(item.id)}>
                                    <Text style={styles.delete}>Удалить</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
                onEndReached={loadMoreReviews}
                onEndReachedThreshold={0.3}
            />

            <TouchableOpacity style={styles.button} onPress={() => { setEditingReview(null); setModalVisible(true); }}>
                <Text style={styles.buttonText}>Оставить отзыв</Text>
            </TouchableOpacity>

            <AddReviewModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditingReview(null);
                }}
                onSubmit={handleSubmitReview}
                doctorName={doctor.name}
                initialData={editingReview}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#902be84e',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },

    back: {
        fontSize: 15,
    },

    info: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },

    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#8f2be8c8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },

    avatarText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
    },

    name: {
        fontSize: 20,
        fontWeight: '700',
    },

    specialty: {
        color: '#777',
        marginVertical: 4,
    },

    meta: {
        color: '#555',
        marginBottom: 8,
    },

    about: {
        textAlign: 'center',
        color: '#666',
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        margin: 16,
    },

    reviewCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 10,
    },

    reviewAuthor: {
        fontWeight: '600',
    },

    reviewRating: {
        color: '#8f2be8c8',
        marginVertical: 2,
    },

    reviewText: {
        color: '#555',
    },

    empty: {
        textAlign: 'center',
        color: '#777',
        marginTop: 20,
    },

    button: {
        backgroundColor: '#8f2be8c8',
        padding: 14,
        margin: 16,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    sortRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },

    sortText: {
        fontSize: 14,
        color: '#555',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 8,
        backgroundColor: '#fff',
    },

    activeSort: {
        backgroundColor: '#8f2be8c8',
        color: '#fff',
        borderColor: '#8f2be8c8',
        fontWeight: '600',
    },

});



