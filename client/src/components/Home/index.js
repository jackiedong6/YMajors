import React, { useState, useEffect, useContext } from "react";
import MajorDataService from "../../services/MajorRequirements.js";
import SearchBar from "../SearchBar";
import MajorNames from "../../data/data.json";
import UserContext from "../../contexts/UserContext";
import "./index.scss";
import { makeStyles } from "@material-ui/styles";
import { CardContent, Card, Typography, Grid, Checkbox } from "@mui/material";
import UserCourseService from "../../services/UserCourseList.js";
import UserCourseList from "../../services/UserCourseList.js";

const Home = () => {
  const { courseList } = useContext(UserContext);

  const initialMajorState = {
    majorName: "",
    majorCode: "",
    majorComponentFamilies: [],
  };

  const [major, setMajor] = useState(initialMajorState);
  const [checkedState, setCheckedState] = useState(new Array(76).fill(false));

  const handleOnChange = (position, name) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    if (!checkedState[position]) {
      UserCourseList.add(name);
    } else {
      UserCourseList.delete(name);
    }
  };

  const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "85px",
      paddingRight: "85px",
    },
    root: {
      minWidth: 300,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    parentFlexRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    leftAlignItem: {
      marginRight: "auto",
      marginTop: "auto",
    },
  });

  const classes = useStyles();
  useEffect(() => {
    getMajor();
  }, []);

  const getMajor = async (query, by) => {
    MajorDataService.find(query, by)
      .then((response) => {
        setMajor(response.data);
        // getCount(response.data.majorComponentFamilies);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  var checkIndex = 0;
  const renderCourseRequirements = (courseList) => {
    return (
      <Grid>
        {courseList.map((course, index) => {
          var Index = checkIndex;
          checkIndex = checkIndex + 1;
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card sx={{ width: 200 }} variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {course}
                  </Typography>
                  <Checkbox
                    id={`custom-checkbox-${Index}`}
                    name={course}
                    value={course}
                    checked={checkedState[Index]}
                    onChange={() => handleOnChange(Index, course)}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  const renderComponents = (components) => {
    return (
      <Grid justify="center">
        {components.map((component, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {component.component_name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Required Number of Courses: {component.required_num_courses}
                  </Typography>
                  {renderCourseRequirements(component.course_list)}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderComponentFamilies = (componentFamilies) => {
    return (
      <Grid container spacing={4}>
        {componentFamilies.map((componentFamily, index) => {
          if (componentFamily.component_list.length > 1)
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {componentFamily.component_family_name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Required Number of Components :{" "}
                      {componentFamily.required_num_components}
                    </Typography>
                    {renderComponents(componentFamily.component_list)}
                  </CardContent>
                </Card>
              </Grid>
            );
          return (
            <>
              <Grid key={index} item xs={12} sm={6} md={4}>
                {renderComponents(componentFamily.component_list)}
              </Grid>
            </>
          );
        })}
      </Grid>
    );
  };
  return (
    <div className="container home">
      <SearchBar
        placeholder="Enter Major Name ..."
        data={MajorNames}
        onChange={(value) => getMajor(value, "name")}
      />

      {Array.isArray(major.majorComponentFamilies) &&
      major.majorComponentFamilies.length > 0 ? (
        <>
          <h1>
            {major.majorName} ({major.majorCode})
          </h1>
          {renderComponentFamilies(major.majorComponentFamilies)}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
