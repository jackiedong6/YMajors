import React, { useState, useEffect, useContext } from "react";
import MajorDataService from "../../services/MajorRequirements.js";
import SearchBar from "../SearchBar";
import MajorNames from "../../data/data.json";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Button from "@mui/material/Button";
import "./index.scss";
import Logout from "../Logout";
import ComponentBar from "../ComponentBar";
import { menuItems } from "../../menuitems.js";

const Home = () => {
  const { checkContext } = useContext(UserContext);

  const [major, setMajor] = useState(menuItems);
  const [searchName, setSearchName] = useState("");
  const [checked, setChecked] = useState([]);
  console.log(major);
  useEffect(() => {
    getMajor();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const getMajor = (query, by) => {
    MajorDataService.find(query, by)
      .then((response) => {
        setMajor(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    getMajor(searchName, "name");
  };

  const findMajor = (name) => {
    setMajor(name);
    getMajor(name, major);
  };

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const renderCourseRequirements = (courseList) => {
    return (
      <div>
        {courseList.map((course, index) => {
          return (
            <div key={index}>
              <input value={course} type="checkbox" />
              <span>{course}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderComponents = (components) => {
    return (
      <div>
        {components.map((component, index) => {
          return (
            <>
              <h2>{component.component_name}</h2>
              <p>
                Required Number of Courses: {component.required_num_courses}
              </p>
              {renderCourseRequirements(component.course_list)}
            </>
          );
        })}
      </div>
    );
  };

  const renderComponentFamilies = (componentFamilies) => {
    return (
      <div>
        {componentFamilies.map((componentFamily, index) => {
          if (componentFamily.component_list.length > 1)
            return (
              <>
                <h3>{componentFamily.component_family_name}</h3>
                <p>
                  Required Number of Components :{" "}
                  {componentFamily.required_num_components}
                </p>
                {renderComponents(componentFamily.component_list)}
              </>
            );
          return <>{renderComponents(componentFamily.component_list)}</>;
        })}
        )
      </div>
    );
  };

  return (
    <>
      <div className="container major-requirements-page">
        <SearchBar
          placeholder="Enter Major Name ..."
          data={MajorNames}
          onChange={(value) => getMajor(value, "name")}
        />
        <ComponentBar componentFamilies={major["majorComponentFamilies"]} />
      </div>
    </>
  );
};

export default Home;
