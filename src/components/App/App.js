import {BrowserRouter, Routes, Route} from "react-router-dom";

import * as PageLayout from "../PageLayout";
import Main from '../Main';
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import Error from "../Error";
import Profile from "../Profile"; 
import * as Movies from "../Movies";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout.NoHeaderAndFooter/>}>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="*" element={<Error/>}/>
        </Route>
        <Route element={<PageLayout.Default/>}>
          <Route index path="/" element={<Main/>}/>
        </Route>
        <Route element={<PageLayout.NoFooter theme="white"/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route element={<PageLayout.Default theme="white"/>}>
          <Route path="/movies/saved" element={<Movies.Saved/>}/>
          <Route path="/movies/list" element={<Movies.List/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
