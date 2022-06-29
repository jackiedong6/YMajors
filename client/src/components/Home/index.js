import CardView from "./CardView";
import SemesterView from "./SemesterView";
import { useState } from "react";
import { ToggleButton } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "./index.scss";

const Home = () => {
  const [selected, setSelected] = useState(false);

  const handleChange = () => {
    setSelected(!selected);
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
