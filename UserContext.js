import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name, id) => {
    setUser((prev) => ({ ...(prev || {}), name, id }));
  };

  const logout = () => {
    // Note: keep stored user info but we clear it to simulate logout
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
