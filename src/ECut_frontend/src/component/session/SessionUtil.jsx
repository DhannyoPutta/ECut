import React, { createContext, useContext, useState } from "react";
import { ECut_backend } from "declarations/ECut_backend";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password) => {
    const loginResult = await ECut_backend.login(email, password);
    if (loginResult) {
      sessionStorage.setItem("authToken", loginResult.ok);
      await refreshSession();
    }
  };

  const logout = async () => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      await ECut_backend.logout(token);
    }
    sessionStorage.clear();
    setUserInfo(null);
  };

  const refreshSession = async () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      sessionStorage.clear();
      setUserInfo(null);
      return;
    }

    try {
      const userId = await ECut_backend.validate_session(token);
      if (userId) {
        const userInfo = await ECut_backend.read_users(userId.ok);
        if (userInfo) {
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo[0]));
          setUserInfo(userInfo[0]);
          return;
        }
      }
      sessionStorage.clear();
      setUserInfo(null);
    } catch (error) {
      console.error("Error refreshing session:", error);
      sessionStorage.clear();
      setUserInfo(null);
    }
  };

  return (
    <SessionContext.Provider value={{ userInfo, login, logout, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
