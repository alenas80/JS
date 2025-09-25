import {users} from './data.js'
import {fetchUsers} from './api.js'

export const createUser = ({name, email, isActive = true}) => {
    const max_id = Math.max(...users.map(i => i.id));
    const new_id = max_id + 1;
    const new_user = { id: new_id, name, email, isActive };
    users.push(new_user);

    return new_user;
};

export const findUserById = (id) => {
    const user = users.find(user => user.id === id);
    if (user) {
        const {name, email} = user;
        return {name, email};
    } else {
        return null;
    }
};

export const updateUser = (id, updatedFields) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        const updatedUser = { ...users[index], ...updatedFields };
        users[index] = updatedUser;
        return updatedUser;
    } else {
        return null;
    }
};

export const getActiveUsers = async () => {
    try {
        const users = await fetchUsers();
        const active = users.filter(user => user.id % 2 === 0);
        return active;
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }   
};

export const getUserWithPosts = async (userId) => {
    try {
        const [user, posts] = await Promise.all([fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(r => r.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json())]);
        const user_posts = { ...user, posts};  
        return user_posts;
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }   
};

export const findUserByEmail = async (email) => {
     try {
        const users = await fetchUsers();
        const user = users.find(i => i.email === email);
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }   
};