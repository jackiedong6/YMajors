import React, { useState, useContext } from "react";
import MajorDataService from "../../../services/MajorRequirements.js";
import SearchBar from "../SearchBar";
import MajorNames from "../../../data/data.json";
import UserContext from "../../../contexts/UserContext";
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
import UserCourseService from "../../../services/UserCourseList.js";
const CardView = () => {
  const { courseList, semesterList } = useContext(UserContext);

  const initialMajorState = {
    majorName: "",
    majorCode: "",
    majorComponentFamilies: [],
  };

  const [majorData, setMajorData] = useState(initialMajorState);
  const [checkedCourses, setCheckedCourses] = useState(courseList);
  const [componentLimit, setComponentLimit] = useState([]);
  const [componentFamilyLimit, setComponentFamilyLimit] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  /**
   * updates the checked courses, the database, as well as the limits for both components and componentfamilys
   * @param checkedCourse is the course that is being checkedd
   * @param checkedComponentName is the course family name that is being updated
   * @param componentIndex is the course component to which the course belongs to
   * @param componentFamilyIndex is which componentFamily the course belongs to
   */
  const handleOnChange = (
    checkedCourse,
    checkedComponentName,
    componentIndex,
    componentFamilyIndex
  ) => {
    // copy the componentLimit array
    const updatedComponentLimit = [...componentLimit];
    // copy the componentFamilyLimit array
    const updatedComponentFamilyLimit = [...componentFamilyLimit];

    const updatedCheckedCourses = checkedCourses?.includes(checkedCourse)
      ? checkedCourses?.filter((name) => name !== checkedCourse)
      : [...(checkedCourses ?? []), checkedCourse];

    let difference = updatedCheckedCourses.filter(
      (x) => !checkedCourses.includes(x)
    );

    // This means that we added the course
    if (difference.length > 0) {
      // Add the course to the databas
      UserCourseService.add(checkedCourse);
      // setCourseList(data);
      // Add the course to the checked list for that component
      updatedComponentLimit[componentIndex].checked.push(checkedCourse);
      // if that component is now satisfied then we want to add that to the component family's satisfied components
      if (
        updatedComponentLimit[componentIndex].checked.length >=
        updatedComponentLimit[componentIndex].limit
      ) {
        updatedComponentFamilyLimit[
          componentFamilyIndex
        ].checkedComponentFamily.push(checkedComponentName);
      }
    }
    // if the difference length is none then that means we unchecked a box
    else {
      // Delete the course from our database
      UserCourseService.delete(checkedCourse);
      semesterList.forEach((semester, index) => {
        semester.forEach((course) => {
          if (course === checkedCourse) {
            UserCourseService.deleteCourseFromSemester(checkedCourse, index);
          }
        });
      });

      // Add the course to the updatedComponentLimit array at the component index where course lies
      updatedComponentLimit[componentIndex].checked.pop(checkedCourse);

      // Pop that component family (pop will return null if not found anyways)
      updatedComponentFamilyLimit[
        componentFamilyIndex
      ].checkedComponentFamily.pop(checkedComponentName);
    }

    // set the componentFamilyLimit array and componentLimit array and checked courses
    setComponentLimit(updatedComponentLimit);
    setComponentFamilyLimit(updatedComponentFamilyLimit);
    setCheckedCourses(updatedCheckedCourses);
  };

  /**
   * returns a boolean determining if a checkbox is disabled or not
   * @param course deals with which course we are checking should be disabled or not
   * @param componentIndex deals with which component we are looking at
   * @param componentFamilyIndex deals with which compoentFamily we are looking at
   */
  const isDisabled = (course, componentIndex, componentFamilyIndex) => {
    // if the component family limit has been reached then just return if the checkbox has already been checked
    if (
      componentFamilyLimit[componentFamilyIndex].checkedComponentFamily
        .length >= componentFamilyLimit[componentFamilyIndex].limit
    )
      return componentLimit[componentIndex].checked.indexOf(course) === -1;
    // if the component family limit has not been reached then check if the component itself has been meet and
    // if the element has been checked already
    else {
      return (
        componentLimit[componentIndex].checked.length >=
          componentLimit[componentIndex].limit &&
        // If not already checked
        componentLimit[componentIndex].checked.indexOf(course) === -1
      );
    }
  };

  /**
   * gets the data after searching for a course in the searchbar from the backend. Initializes the limit arrays and checked courses
   * @param query is the name of the major we are getting data from in the backend
   */
  const getData = async (query) => {
    // Initializing the state for our global hooks in this function
    var newCheckedComponentList = [];
    var newCheckedComponentFamilyList = [];

    // gets the response data in regards to the major we are interested in from the backend
    MajorDataService.find(query)
      .then((response) => {
        // sets the major data to the response data
        setMajorData(response.data);

        // if the data exists then we want to initialize the other stuff
        if (response.data.majorComponentFamilies) {
          // Looping through the component families

          response.data.majorComponentFamilies.forEach((componentFamily) => {
            // gets the limit from the component family
            var componentFamilyLimit = parseInt(
              componentFamily.required_num_components
            );
            var newComponentFamilyList = [];

            // Loops through each of the components in each component family
            componentFamily.component_list.forEach((component) => {
              // courselimit on each component
              var courseLimit = parseInt(component.required_num_courses);

              // the course list for a component
              var newUserCourseList = [];

              // Loops through all of the courses in each component
              component.course_list.forEach((course) => {
                // if the courselist includes the course then add that to the course list
                if (courseList.includes(course)) {
                  newUserCourseList.push(course);
                }
              });
              // Add to the checked array for components
              newCheckedComponentList.push({
                checked: newUserCourseList,
                limit: courseLimit,
              });
              if (newUserCourseList.length === courseLimit) {
                newComponentFamilyList.push(component.component_name);
              }
            });
            newCheckedComponentFamilyList.push({
              checkedComponentFamily: newComponentFamilyList,
              limit: componentFamilyLimit,
            });
          });
          setComponentLimit(newCheckedComponentList);
          setComponentFamilyLimit(newCheckedComponentFamilyList);
          setIsLoadingData(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderCourseRequirements = (
    requiredCourses,
    componentIndex,
    componentFamilyIndex,
    componentFamilyName
  ) => {
    return (
      <Grid container spacing={1}>
        {requiredCourses.map((course, index) => {
          return (
            <Grid key={index + course} item xs={6} lg={4} xl={4}>
              <Card
                className={
                  checkedCourses.includes(course)
                    ? "CourseCardCompleted"
                    : "CourseCard"
                }
                variant="outlined"
              >
                <CardHeader
                  action={
                    <Checkbox
                      name={course}
                      value={course}
                      className="header"
                      disabled={isDisabled(
                        course,
                        componentIndex,
                        componentFamilyIndex
                      )}
                      checked={checkedCourses.includes(course)}
                      onChange={() =>
                        handleOnChange(
                          course,
                          componentFamilyName,
                          componentIndex,
                          componentFamilyIndex
                        )
                      }
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

  var componentCount = 0;
  const renderComponents = (components, componentFamilyIndex) => {
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {components.map((component, index) => {
          var temp_index = componentCount;
          componentCount = componentCount + 1;
          return (
            <Grid
              key={index + component.component_name}
              item
              className="grid"
              xs={12}
              lg={4}
              xl={2}
            >
              <Card
                className={
                  componentLimit[temp_index].checked.length >=
                  componentLimit[temp_index].limit
                    ? "ComponentCardCompleted"
                    : "ComponentCard"
                }
                variant="outlined"
              >
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
                  {renderCourseRequirements(
                    component.course_list,
                    temp_index,
                    componentFamilyIndex,
                    component.component_name
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderComponentFamilies = (majorComponentFamilies) => {
    return (
      <Masonry className="masonry" columns={3} spacing={2}>
        {majorComponentFamilies.map((componentFamily, index) => {
          if (componentFamily.component_list.length > 1)
            return (
              <Card
                key={index + componentFamily.component_family_name}
                className={
                  componentFamilyLimit[index].checkedComponentFamily.length >=
                  componentFamilyLimit[index].limit
                    ? "ComponentFamilyCardCompleted"
                    : "ComponentFamilyCard"
                }
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
                  {renderComponents(componentFamily.component_list, index)}
                </CardContent>
              </Card>
            );
          return (
            <div key={Math.random()}>
              {renderComponents(componentFamily.component_list, index)}
            </div>
          );
        })}
      </Masonry>
    );
  };
  return (
    <div className="container home">
      <SearchBar
        placeholder="Enter Major Name ..."
        data={MajorNames}
        onChange={(value) => getData(value)}
      />
      <div className="mui-grid">
        {Array.isArray(majorData.majorComponentFamilies) &&
        majorData.majorComponentFamilies.length > 0 &&
        !isLoadingData ? (
          <>
            <h1>{majorData.majorName}</h1>
            {renderComponentFamilies(majorData.majorComponentFamilies)}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CardView;
