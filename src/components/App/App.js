import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";

import * as PageLayout from "../PageLayout";
import Main from '../Main';
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import Error from "../Error";
import Profile from "../Profile"; 
import * as Movies from "../Movies";
import useMainApi from "../../hooks/useMainApi";
import useAuth from "../../hooks/useAuth";
import ProtectedRoute from "../ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function App() {
  const {login, logout, isAuthenticated} = useAuth();
  const {mainApi} = useMainApi();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    mainApi.getCurrentUser()
      .then((user) => {
        login()
        setCurrentUser(user)
      })
      .catch((error) => {
        logout()
        setCurrentUser(null)
        console.log("get current error: %s", error) 
      })
      .finally(() => setIsLoading(false))
  }, [isAuthenticated]);
  
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout.NoHeaderAndFooter isLoading={isLoading}/>}>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="*" element={<Error/>}/>
          </Route>
          <Route element={<PageLayout.Default isLoading={isLoading}/>}>
            <Route index path="/" element={<Main/>}/>
          </Route>
          <Route element={<PageLayout.NoFooter theme="white" isLoading={isLoading}/>}>
            <Route path="/profile" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}  isLoading={isLoading} redirectPath="/"><Profile/></ProtectedRoute>
            }/>
          </Route>
          <Route element={<PageLayout.Default theme="white" isLoading={isLoading}/>}>
            <Route path="/saved-movies" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}  isLoading={isLoading} redirectPath="/"><Movies.Saved/></ProtectedRoute>
            }/>
            <Route path="/movies" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}  isLoading={isLoading} redirectPath="/"><Movies.List/></ProtectedRoute>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}
