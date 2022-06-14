import React from "react";
import MenuItems from "../MenuItems";

const ComponentBar = ({ componentFamilies }) => {
  console.log(componentFamilies);

  return (
    <>
      {Array.isArray(componentFamilies) && componentFamilies.length > 0 ? (
        <ul className="menus">
          {componentFamilies.map((menu, index) => {
            const depthLevel = 0;

            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
        </ul>
      ) : (
        <h1>No Major Component Families Found</h1>
      )}
    </>
  );
};

export default ComponentBar;
