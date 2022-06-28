import "./index.scss";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import MajorDataService from "../../services/MajorRequirements";
import { Typography, Box, LinearProgress } from "@mui/material";
import React from "react";
import { withStyles } from "@material-ui/styles";

const MajorProgress = () => {
  const initialMajorState = {
    majorName: "",
    majorCode: "",
    majorComponentFamilies: [],
    
  };
  const [majorData, setMajorData] = useState(initialMajorState);
  const { courseList, userMajor } = useContext(UserContext);

  MajorDataService.find(userMajor).then((response) => {
    setMajorData(response.data);
    console.log(courseList, majorData);
  });
  const [progress, setProgress] = useState(0);

  return (
    <div className="container progress">
      <Box sx={{ alignItems: "center" }}>
        <Box sx={{ width: "50%", mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 205 }}>
          <Typography variant="body2" color="text.secondary">
            {progress}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default MajorProgress;
