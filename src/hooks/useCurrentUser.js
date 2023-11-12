import {useContext} from "react";
import currentUserContext from "../contexts/CurrentUserContext";

export default function useCurrentUser() {
  return useContext(currentUserContext);
}