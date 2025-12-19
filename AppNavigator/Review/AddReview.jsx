import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';

export default function AddReviewModal({
    visible,
    onClose,
    onSubmit,
    doctorName,
    initialData,
}) {
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [visitDate, setVisitDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setReviewText(initialData.text);
            setReviewRating(initialData.rating);
            setVisitDate(
                initialData.visitDate
                    ? new Date(initialData.visitDate).toLocaleDateString('ru-RU')
                    : ''
            );
        } else {
            setReviewText('');
            setReviewRating(0);
            setVisitDate('');
        }
        setError('');
    }, [initialData, visible]);

    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split('.');
        if (!day || !month || !year) return null;
        return new Date(year, month - 1, day).toISOString();
    };

    const submitReview = () => {
        if (!reviewText || !reviewRating) {
            setError('Заполните отзыв и оценку');
            return;
        }

        onSubmit({
            text: reviewText,
            rating: reviewRating,
            visitDate: parseDate(visitDate),
        });
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.optionText}>
                        {initialData ? 'Редактировать отзыв' : `Оставить отзыв на ${doctorName}`}
                    </Text>

                    <Text style={styles.label}>Оценка</Text>
                    <View style={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <TouchableOpacity key={star} onPress={() => setReviewRating(star)}>
                                <Text style={[ styles.star, reviewRating >= star && styles.starActive,]}>✩</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput
                        placeholder="Ваш отзыв"
                        value={reviewText}
                        onChangeText={setReviewText}
                        style={styles.input}
                        multiline
                    />

                    <TextInput
                        placeholder="Дата визита (дд.мм.гггг)"
                        value={visitDate}
                        onChangeText={setVisitDate}
                        style={styles.input}
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={onClose}>
                            <Text>Отмена</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={submitReview}>
                            <Text style={styles.review}>
                                {initialData ? 'Сохранить' : 'Отправить'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    optionText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },

    label: {
        fontWeight: '500',
        marginBottom: 6,
    },

    input: {
        backgroundColor: '#F5F6FA',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 14,
    },

    starsRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },

    star: {
        fontSize: 28,
        color: '#ccc',
        marginRight: 4,
    },

    starActive: {
        color: '#8f2be8c8',
    },

    errorText: {
        color: 'red',
        marginBottom: 8,
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#8f2be8c8',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    review: {
        color: '#fff',
        fontWeight: '600',
    },
});


