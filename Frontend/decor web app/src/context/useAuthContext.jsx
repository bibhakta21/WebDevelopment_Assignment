import { useContext } from "react";


export const useAuthContext = () => {


  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthContextProvider"
    );
  }

  return context; // Make sure to return the context
};
