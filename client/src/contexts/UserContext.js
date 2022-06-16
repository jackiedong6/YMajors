import { createContext } from "react";

export const defaultUserContext = {
  isLoading: true,
  isAuthenticated: false,
  user: undefined,
  courselist: undefined,
  major: undefined,
  checkContext: () => {},
};

export default createContext(defaultUserContext);
