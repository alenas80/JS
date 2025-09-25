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

export const simulateLoading = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); 
    }, delay);
  });
};

export const withTimeout = async (promise, timeoutMs) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Ошибка таймаута")), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]);
};

export const retryOperation = async (operation, retries, delay = 100) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
    }
  }
};
