import {useContext} from "react";
import savedDataContext from "../contexts/SavedDataContext";

export default function useSavedData() {
  return useContext(savedDataContext);
}