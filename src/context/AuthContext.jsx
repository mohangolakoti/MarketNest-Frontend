import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { loginRequest, logoutRequest, signupRequest } from '../api/authApi';
import { clearAccessToken, setAccessToken } from '../api/axios';
import {
  clearStoredAuth,
  getStoredAccessToken,
  getStoredUser,
  setStoredAccessToken,
  setStoredUser,
} from '../utils/tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getStoredAccessToken();

    if (storedToken) {
      setAccessToken(storedToken);
      setStoredAccessToken(storedToken);
    }

    if (storedUser) {
      setUser(storedUser);
    }

    setIsInitializing(false);
  }, []);

  const persistAuth = useCallback((nextUser, token) => {
    setUser(nextUser);
    setAccessToken(token);
    setStoredUser(nextUser);
  }, []);

  const login = useCallback(async (payload) => {
    const response = await loginRequest(payload);
    const loggedInUser = response.data?.data?.user;
    const token = response.data?.data?.accessToken;
    persistAuth(loggedInUser, token);
    return loggedInUser;
  }, [persistAuth]);

  const signup = useCallback(async (payload) => {
    await signupRequest(payload);
    return login({ email: payload.email, password: payload.password });
  }, [login]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      clearAccessToken();
      clearStoredAuth();
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      role: user?.role || null,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      signup,
      logout,
    }),
    [user, isInitializing, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
