import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import UserContext from "../../contexts/UserContext";
import Button from "@mui/material/Button";

const Logout = () => {
  const { isAuthenticated, checkContext } = useContext(UserContext);
  const navigate = useNavigate();
  if (isAuthenticated) {
    return (
      <Button
        sx={{ color: "#fff" }}
        className="logout"
        onClick={() =>
          axios.get("/auth/logout").then(({ data }) => {
            if (data.success) {
              checkContext();
              navigate("/");
            }
          })
        }
      >
        Logout
      </Button>
    );
  }
};

export default Logout;
