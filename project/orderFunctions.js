import { orders } from './data.js'
import { fetchPosts } from './api.js';
import { fetchUsers } from './api.js'

export const getUserOrders = (userId) => {
    const user_order = orders.filter(order => order.userId === userId);
    return user_order;
};



export const addProductToOrder = (orderId, newProduct) => {
    const order = orders.findIndex(order => order.id === orderId);
    if (index !== -1) {
        const update_order = { ...orders[index], products: [...order[index].products, newProduct] };
        orders[index] = update_order
        return update_order;
    } else {
        return null;
    }
};


export const getOrderSummary = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    if (!order) {
        return null;
    }
    const { products, total, status, userId } = order;
    const products_count = products.length;
    const update_order = { productsCount: products_count, total: `$${total}`, status: status.toUpperCase(), userId: userId };

    return update_order;
};


export const getrecentPosts = async (limit) => {
    try {
        const posts = await fetchPosts();
        const sort_posts = posts.sort((a, b) => b.id - a.id);

        return sort_posts.slice(0, limit);
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }
};

export const getPostsByTitleSearch = async (searchTerm) => {
    try {
        const posts = await fetchPosts();
        const post_searchTerm = posts.filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()));

        return post_searchTerm;
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }
};

export const getPostsStats = async () => {
    try {
        const [users, posts] = await Promise.all([
            fetchUsers(),
            fetchPosts()
        ]);
        const kol_users = users.length;
        const kol_posts = posts.length;
        const avar_post = kol_posts / kol_users;

        return {
            kol_users,
            kol_posts,
            avar_post
        };
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }

};