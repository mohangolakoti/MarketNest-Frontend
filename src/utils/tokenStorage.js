const ACCESS_TOKEN_KEY = 'marketnest_access_token';
const USER_KEY = 'marketnest_user';

export const getStoredAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const setStoredAccessToken = (token) => {
  if (!token) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getStoredUser = () => {
  const serialized = localStorage.getItem(USER_KEY);
  if (!serialized) {
    return null;
  }

  try {
    return JSON.parse(serialized);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setStoredUser = (user) => {
  if (!user) {
    localStorage.removeItem(USER_KEY);
    return;
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
