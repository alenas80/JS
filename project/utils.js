export const calculateTotal = (...prices) => { 
 return prices.reduce((total, price) => total + price, 0);
};

export const formatUserInfo = (user) => {
    const {name, email, isActive} = user;
    if (isActive) {
        return `Пользователь: ${name} (${email}). Status: Active`;
    } else {
        return `Пользователь: ${name} (${email}). Status: Inactive`;
    }
};
