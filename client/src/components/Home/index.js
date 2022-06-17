import React, { useState, useEffect, useContext } from "react";
import MajorDataService from "../../services/MajorRequirements.js";
import SearchBar from "./SearchBar";
import MajorNames from "../../data/data.json";
import UserContext from "../../contexts/UserContext";
import "./index.scss";
import {
  CardContent,
  Card,
  Typography,
  Grid,
  Checkbox,
  CardHeader,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import UserCourseService from "../../services/UserCourseList.js";


const Home = () => {
  const { courseList } = useContext(UserContext);

  const initialMajorState = {
    majorName: "",
    majorCode: "",
    majorComponentFamilies: [],
  };

  const [major, setMajor] = useState(initialMajorState);
  const [checkedState, setCheckedState] = useState(courseList);

  const [checkedLimit, setCheckedLimit] = useState([]);
  const [isBusy, setBusy] = useState(true);

  const handleOnChange = (checkedName, index) => {
    const updatedCheckArray = [...checkedLimit];
    const updatedCheckedState = checkedState?.includes(checkedName)
      ? checkedState?.filter((name) => name !== checkedName)
      : [...(checkedState ?? []), checkedName];

    let difference = updatedCheckedState.filter(
      (x) => !checkedState.includes(x)
    );

    if (difference.length > 0) {
      UserCourseService.add(checkedName);
      updatedCheckArray[index].checked.push(checkedName);
    } else {
      UserCourseService.delete(checkedName);
      updatedCheckArray[index].checked.pop(checkedName);
    }

    setCheckedState(updatedCheckedState);
    return updatedCheckedState;
  };

  useEffect(() => {
    getMajor();
  }, []);

  const isDisabled = (course, index) => {
    return (
      checkedLimit[index].checked.length >= checkedLimit[index].limit &&
      checkedLimit[index].checked.indexOf(course) === -1
    );
  };

  const getMajor = async (query, by) => {
    var array = [];
    MajorDataService.find(query, by)
      .then((response) => {
        setMajor(response.data);
        if (response.data.majorComponentFamilies) {
          response.data.majorComponentFamilies.map((ComponentFamily) => {
            ComponentFamily.component_list.map((component) => {
              var temp = component.required_num_courses;
              var user_courses = [];
              component.course_list.map((course) => {
                if (courseList.includes(course)) {
                  user_courses.push(course);
                }
              });
              array.push({
                checked: user_courses,
                limit: temp,
              });
            });
          });
          setBusy(false);
          setCheckedLimit(array);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const renderCourseRequirements = (RequiredCourses, component_index) => {
    return (
      <Grid container spacing={1}>
        {RequiredCourses.map((course, index) => {
          return (
            <Grid key={index + course} item xs={6} lg={4} xl={4}>
              <Card className="CourseCard" variant="outlined">
                <CardHeader
                  action={
                    <Checkbox
                      name={course}
                      value={course}
                      className="header"
                      disabled={isDisabled(course, component_index)}
                      checked={checkedState.includes(course)}
                      onChange={() => handleOnChange(course, component_index)}
                    />
                  }
                  title={
                    <Typography
                      className="CourseTitle"
                      color="textSecondary"
                      gutterBottom
                    >
                      {course}
                    </Typography>
                  }
                ></CardHeader>
                <CardContent className="content"></CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  var component_count = 0;
  const renderComponents = (components) => {
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {components.map((component, index) => {
          var temp = component_count;
          component_count = component_count + 1;
          return (
            <Grid
              key={index + component.component_name}
              item
              className="grid"
              xs={12}
              lg={4}
              xl={2}
            >
              <Card className="ComponentCard" variant="outlined">
                <CardContent>
                  <Typography
                    className="ComponentTitle"
                    color="textSecondary"
                    gutterBottom
                  >
                    {component.component_name}
                  </Typography>
                  <Typography className="pos" color="textSecondary">
                    Required # of Courses: {component.required_num_courses}
                  </Typography>
                  {renderCourseRequirements(component.course_list, temp)}
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
      <Masonry className="masonry" columns={3} spacing={2}>
        {componentFamilies.map((componentFamily, index) => {
          if (componentFamily.component_list.length > 1)
            return (
              <Card
                key={index + componentFamily.component_family_name}
                className="ComponentFamilyCard"
                variant="outlined"
              >
                <CardContent>
                  <Typography
                    className="ComponentFamilyTitle"
                    color="textSecondary"
                    gutterBottom
                  >
                    {componentFamily.component_family_name}
                  </Typography>
                  <Typography className="pos" color="textSecondary">
                    Required # of Components :{" "}
                    {componentFamily.required_num_components}
                  </Typography>
                  {renderComponents(componentFamily.component_list)}
                </CardContent>
              </Card>
            );
          return <>{renderComponents(componentFamily.component_list)}</>;
        })}
      </Masonry>
    );
  };
  return (
    <div className="container home">
      <SearchBar
        placeholder="Enter Major Name ..."
        data={MajorNames}
        onChange={(value) => getMajor(value, "name")}
      />
      <div className="mui-grid">
        {Array.isArray(major.majorComponentFamilies) &&
        major.majorComponentFamilies.length > 0 &&
        !isBusy ? (
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
    </div>
  );
};

export default Home;
