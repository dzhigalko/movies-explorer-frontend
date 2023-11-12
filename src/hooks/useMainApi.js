import {useContext} from "react";
import mainApiContext from "../contexts/MainApiContext";

export default function useMainApi() {
  return useContext(mainApiContext);
}