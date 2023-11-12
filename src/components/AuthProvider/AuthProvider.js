import { useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import useSavedData from "../../hooks/useSavedData";

export default function AuthProvider({ children }) {  
  const {resetSavedMoviesSearch} = useSavedData()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (handleLogin) => {
    setIsAuthenticated(true)

    if (handleLogin) handleLogin()
  }

  const logout = (handleLogout) => {
    setIsAuthenticated(false)
    resetSavedMoviesSearch()

    if (handleLogout) handleLogout()
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}