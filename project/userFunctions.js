import {users} from './data.js'

export const createUser = ({name, email, isActive = true}) => {
    const max_id = Math.max(...users.map(i => i.id));
    const new_id = max_id + 1;
    const new_user = { new_id, name, email, isActive };
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
    const user = users.find(user => user.id === id);
    if (user) {
        const update_user = {...user, ...updatedFields};
        users[id - 1] = update_user;
        return update_user;
    } else {
        return null;
    }
};
