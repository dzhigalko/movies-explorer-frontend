import { useState } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function AuthProvider({ children }) {  
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

  const login = (handleLogin) => {
    localStorage.setItem("isAuthenticated", true)
    setIsAuthenticated(true)

    if (handleLogin) handleLogin()
  }

  const logout = (handleLogout) => {
    localStorage.setItem("isAuthenticated", false)
    setIsAuthenticated(false)

    if (handleLogout) handleLogout()
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}