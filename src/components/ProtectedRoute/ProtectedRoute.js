import {Navigate} from "react-router-dom";
import Preloader from "../Preloader";

export default function ProtectedRoute({redirectPath, isAuthenticated, isLoading, children}) {
  if (isLoading) {
    return (<Preloader/>)
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace/>
  }

  return children
}