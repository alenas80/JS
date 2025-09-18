import { createUser, findUserById, updateUser } from './userFunctions.js';
import { getUserOrders, addProductToOrder, getOrderSummary } from './orderFunctions.js';
import { calculateTotal, formatUserInfo} from './utils.js';

console.log(createUser({name:'Алёна', email:'skzoo2017@mail.ru'}));
console.log(findUserById(1));
console.log(updateUser(3, {name: 'SKZoo'}));

console.log(getUserOrders(1));
console.log(addProductToOrder(102, 'Ластик'))
console.log(getOrderSummary(103))

console.log(calculateTotal(1, 2, 3, 4, 5));
console.log(formatUserInfo({name:'Алёна', email:'skzoo2017@mail.ru', isActive: true}));