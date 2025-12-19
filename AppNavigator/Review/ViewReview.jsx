import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'doctor_reviews';


export const getAllReviews = async () => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : {};
    } catch (e) {
        console.error('Ошибка загрузки отзывов:', e);
        return {};
    }
};

export const getReviews = async (doctorId) => {
    const all = await getAllReviews();
    return all[doctorId] || [];
};

export const addReview = async (doctorId, review) => {
    const all = await getAllReviews();
    const reviews = all[doctorId] || [];

    const updated = [review, ...reviews];
    all[doctorId] = updated;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return updated;
};

export const updateReview = async (doctorId, updatedReview, userEmail) => {
    const all = await getAllReviews();
    const reviews = all[doctorId] || [];

    const updated = reviews.map(r =>
        r.id === updatedReview.id && r.userEmail === userEmail
            ? { ...r, ...updatedReview, updatedAt: new Date().toISOString() }
            : r
    );

    all[doctorId] = updated;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return updated;
};

export const deleteReview = async (doctorId, reviewId, userEmail) => {
    const all = await getAllReviews();
    const reviews = all[doctorId] || [];

    const updated = reviews.filter(
        r => !(r.id === reviewId && r.userEmail === userEmail)
    );

    all[doctorId] = updated;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return updated;
};
