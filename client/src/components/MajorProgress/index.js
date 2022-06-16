import "./index.scss";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import MajorDataService from "../../services/MajorRequirements";

const MajorProgress = () => {
  const { userMajor } = useContext(UserContext);
  const [majorRequirements, setMajorRequirements] = useState();

  MajorDataService.find(userMajor).then((response) => {
    setMajorRequirements(response.data);
  });

  return <div className="container progress">{userMajor}</div>;
};

export default MajorProgress;
