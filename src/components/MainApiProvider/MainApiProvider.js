import { useMemo } from "react";
import MainApiContext from "../../contexts/MainApiContext";
import MainApi from "../../utils/MainApi";

const mainApiUrl = process.env.REACT_APP_MAIN_API_URL || '/api';

export default function MainApiProvider({ children }) {
  const mainApi = useMemo(function() {
    return new MainApi({ baseUrl: mainApiUrl })
  }, [])

  return (
    <MainApiContext.Provider value={{ mainApi }}>
      {children}
    </MainApiContext.Provider>
  );
}