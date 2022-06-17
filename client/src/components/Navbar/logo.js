import { Link } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const Logo = () => {
  const { isLoading, isAuthenticated } = useContext(UserContext);
  if (isAuthenticated) {
    return (
      <Link
        href="/home"
        variant="h6"
        sx={{
          flexGrow: 1,
          display: {
            xs: "none",
            sm: "block",
            fontSize: 24,
            color: "#fff",
            textDecoration: "none",
          },
        }}
      >
        YMajor
      </Link>
    );
  } else {
    return (
      <Link
        href="/"
        variant="h6"
        sx={{
          flexGrow: 1,
          display: {
            xs: "none",
            sm: "block",
            fontSize: 24,
            color: "#fff",
            textDecoration: "none",
          },
        }}
      >
        YMajor
      </Link>
    );
  }
};

export default Logo;
