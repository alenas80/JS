import { createUser, findUserById, updateUser } from './userFunctions.js';
import { getUserOrders, addProductToOrder, getOrderSummary } from './orderFunctions.js';
import { calculateTotal, formatUserInfo } from './utils.js';

import { fetchUsers, fetchUserById, fetchPosts, fetchPostsByUserId } from './api.js'
import { getActiveUsers, getUserWithPosts, findUserByEmail } from './userFunctions.js'
import { getrecentPosts, getPostsByTitleSearch, getPostsStats } from './orderFunctions.js';
import { simulateLoading, withTimeout, retryOperation } from './utils.js';

/*console.log(createUser({ name: 'Алёна', email: 'skzoo2017@mail.ru' }));
console.log(findUserById(1));
console.log(updateUser(3, { name: 'SKZoo' }));

console.log(getUserOrders(1));
console.log(addProductToOrder(102, 'Ластик'))
console.log(getOrderSummary(103))

console.log(calculateTotal(1, 2, 3, 4, 5));
console.log(formatUserInfo({ name: 'Алёна', email: 'skzoo2017@mail.ru', isActive: true }));
*/

export const main = async () => {
    try {
        console.log('Получение списка активных пользователей');
        await simulateLoading(1000);
        const active_users = await getActiveUsers();
        console.log('Активные пользователи: ', active_users);

        console.log('Первый пользователь и его посты');
        await simulateLoading(1000);
        const users = await fetchUsers();
        const first_user = users[0];
        const post = await getUserWithPosts(first_user.id);
        console.log('Пользователь:', first_user);
        console.log('Посты:', post.posts);

        console.log('Поиск пользователя по email');
        await simulateLoading(1000);
        const user = await findUserByEmail(first_user.email);
        console.log('Пользователь:', user);

        console.log('Получение последних постов в системе');
        await simulateLoading(1000);
        const recent_posts = await getrecentPosts(5);
        console.log('Последние посты:', recent_posts);

        console.log('Поиск постов по заголовку');
        await simulateLoading(1000);
        const search_post = await getPostsByTitleSearch('in');
        console.log('Найденые посты:', search_post);

        console.log('Получение статистики по постам и пользователям');
        await simulateLoading(1000);
        const stats = await getPostsStats();
        console.log('Пользователей:', stats.kol_users);
        console.log('Постов:', stats.kol_posts);
        console.log('Среднее постов на пользователя:', stats.avar_post);

        console.log('Демонстрация завершена');
    } catch (error) {
        console.error('Ошибка во время выполнения main():', error);
    } finally {
        console.log('Конец');
    }
};

console.log(main());