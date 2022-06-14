import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import { FormCheckbox } from "../FormCheckbox";

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);

  const [classesTaken, setClassesTaken] = useState([]);

  const checkIfTaken = (name) => {
    console.log(name, classesTaken);
  };

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* <h1>{items.title}</h1> */}
      {/* <h2>{items.submenu.length}</h2> */}
      {/* <ul>
            {items.submenu.map((item, index) => {return <p>{item.title}</p>})}
        </ul> */}

      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <>
          {/* <h2>{items.title}</h2> */}
          <a>
            <FormCheckbox name={items.title} classIsTaken={false} />
          </a>
        </>
      )}
    </li>
    // <h1>{items.title}</h1>
  );
};

export default MenuItems;
