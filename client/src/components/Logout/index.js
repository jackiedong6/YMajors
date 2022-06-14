import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import UserContext from "../../contexts/UserContext";
import Button from "@mui/material/Button";

const Logout = () => {
  const navigate = useNavigate();
  const { checkContext } = useContext(UserContext);
  return (
    <Button
      className="logout"
      variant="outlined"
      onClick={() =>
        axios.get("/auth/logout").then(({ data }) => {
          console.log(data);
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
};

export default Logout;
