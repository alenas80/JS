//a.Проверяет, что аргумент имеет тип string.
//b.Проверяет длину строки (от 5 до 15 символов).
//c.Если проверки не проходят, возвращает строку с ошибкой. Если проходят — возвращает null.

const validateUsername = username => {
    if (typeof username !== 'string') {
        return 'Должно быть строкой';
    }

    if (username.length < 5 || username.length > 15) {
        return 'Длина должна быть от 5 до 15 символов';
    }

    return null;
};

//console.log(validateUsername('skzoo'));

//a.Проверяет, что аргумент имеет тип string.
//b.Проверяет, что строка содержит @ и после нее есть точка (можно использовать includes()).
//c.Возвращает строку с ошибкой или null.

const validateEmail = (email) => {
    if (typeof email === 'string' && email.includes('@') && email.includes('.')) {
        return null;
    } else {
        return 'Должен быть тип string и содержать @.';
    }
};

//console.log(validateEmail('skzoo2017@.ru'));

//a.Проверяет, что аргумент имеет тип number и является целым числом.
//b.Проверяет, что возраст в диапазоне [18, 120].
//c.Возвращает строку с ошибкой или null.

const validateAge = age => {
    if (typeof age !== 'number' || !Number.isInteger(age)) {
        return 'Должно быть целым числом';
    }

    if (age < 18 || age > 120) {
        return 'Возраст должен быть от 18 до 120';
    }

    return null;
};

//console.log(validateAge(20));

//a.Проверяет, что аргумент имеет тип boolean и равен true.
//b.Возвращает строку с ошибкой или null.

const validateAgreement = isAgreed => {
    if (typeof isAgreed !== 'boolean' || isAgreed !== true) {
        return 'Должно быть тип boolean и равен true';
    }
    
    return null;
};

//console.log(validateAgreement(false));

//a.Проверяет, что аргумент является string или undefined.
//b.Если передан undefined (поле не заполнено), возвращает null (ошибки нет).
//c.Если передан string, проверяет, что он начинается с +7 и имеет длину 12 символов.
//d.Возвращает строку с ошибкой или null.

const validatePhone = (phone) => {
    if (typeof phone === 'undefined') {
        return null;
    } else if (typeof phone === 'string'){
        if (phone.startsWith('+7') && phone.length === 12) {
            return null;
        } else {
            return 'Номер должен начинаться на +7 и иметь 12 символов';
        }
    }
};

//console.log(validatePhone('+71234567891'));