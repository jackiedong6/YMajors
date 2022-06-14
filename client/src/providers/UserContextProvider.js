import { useCallback, useEffect, useState } from "react";

import axios from "../utils/axios";
import UserContext from "../contexts/UserContext";

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  const checkContext = useCallback(() => {
    axios
      .get("/auth/check")
      .then(({ data }) => {
        if (data.auth) {
          setIsAuthenticated(true);
          setUser(data.user);
          setIsLoading(false);
        } else {
          setIsAuthenticated(false);
          setUser(undefined);
          setIsLoading(false);
        }
      })
      .catch(() =>
        console.log(
          "Something went wrong while trying to fetch your auth status."
        )
      );
  }, []);

  useEffect(() => {
    checkContext();
  }, [checkContext]);

  return (
    <UserContext.Provider
      value={{ isLoading, isAuthenticated, user, checkContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
