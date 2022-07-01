import CardView from "./CardView";
import SemesterView from "./SemesterView";
import { useState, useEffect, useContext } from "react";
import { ToggleButton } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "./index.scss";
import UserContext from "../../contexts/UserContext";

const Home = () => {
  const { checkContext } = useContext(UserContext);

  const [selected, setSelected] = useState(
    localStorage.getItem("state") === "true"
  );

  useEffect(() => {
    localStorage.setItem("state", selected);
  }, [selected]);

  useEffect(() => {
    checkContext();
  }, [checkContext]);

  const handleChange = () => {
    setSelected(!selected);
    window.location.reload();
  };

  let view;

  if (!selected) {
    view = <CardView />;
  } else {
    view = <SemesterView />;
  }

  
  return (
    <>
      <ToggleButton
        className="toggler"
        value="toggle"
        selected={selected}
        onChange={handleChange}
      >
        <ViewModuleIcon />
      </ToggleButton>
      {view}
    </>
  );
};

export default Home;
