import { useCallback, useEffect, useState } from "react";

import axios from "../utils/axios";
import UserContext from "../contexts/UserContext";

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [courseList, setCourseList] = useState();
  const [semesterList, setSemesterList] = useState();
  const [userMajor, setMajor] = useState();
  const checkContext = useCallback(() => {
    axios
      .get("/auth/check", { withCredentials: true })
      .then(({ data }) => {
        if (data.auth) {
          setIsAuthenticated(true);
          setUser(data.user);
          setCourseList(data.courseList);
          setSemesterList(data.semesterList);
          setMajor(data.major);
          setIsLoading(false);
        } else {
          setIsAuthenticated(false);
          setMajor(undefined);
          setCourseList(undefined);
          setSemesterList(undefined);
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
      value={{
        isLoading,
        isAuthenticated,
        user,
        courseList,
        semesterList,
        userMajor,
        checkContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
