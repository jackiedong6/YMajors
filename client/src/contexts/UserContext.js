import { createContext } from "react";

export const defaultUserContext = {
  isLoading: true,
  isAuthenticated: false,
  checkContext: () => {},
};

export default createContext(defaultUserContext);
