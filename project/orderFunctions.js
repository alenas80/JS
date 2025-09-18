import {orders} from './data.js'

export const getUserOrders = (userId) => {
    const user_order = orders.filter(order => order.userId === userId );
    return user_order;
};



export const addProductToOrder = (orderId, newProduct) => {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        const update_order = {...order, products: [...order.products, newProduct]};
        return update_order;
    } else {
        return null;
    }
};


export const getOrderSummary = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    const {products, total, status, userId} = order;
    const products_count = products.length;
    const update_order = {productsCount: products_count, total: `$${total}`, status: status.toUpperCase(), userId: userId};

    return update_order;
};

