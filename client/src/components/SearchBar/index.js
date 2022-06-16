import React, { useState } from "react";
import "./index.scss";
const MIN_DISTANCE = 20;
// import SavedSearchIcon from '@mui/icons-material/SavedSearch';
// import CloseIcon from '@mui/icons-material/Close';

// import the levenshtein algorithm for typo-tolerant search
const levenshtein = require("js-levenshtein");

// the compoemnts takes two different props: placeholder and data
function SearchBar({ placeholder, data, onChange }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const [major, setMajor] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      // allow for typo-tolerant search using the levenshtein algorithm
      const distance = levenshtein(
        value.majorName.toLowerCase().slice(0, searchWord.length),
        searchWord.toLowerCase()
      );
      // console.log(distance)
      const wordProgress = searchWord.length / value.majorName.length;
      const levenshteinSatisfied = distance <= MIN_DISTANCE;
      const percentageOfSwapping = distance / searchWord.length;

      // return levenshteinSatisfied
      const included = value.majorName
        .toLowerCase()
        .includes(searchWord.toLowerCase());

      if (included) {
        return included;
      } else {
        return (
          levenshteinSatisfied &&
          wordProgress >= 0.5 &&
          percentageOfSwapping <= 0.6
        );
      }
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };

  const handleClick = (value) => {
    onChange(value);
    setWordEntered(value);
    setFilteredData([]);
  };

  return (
    <div className="search">
      {/* everything related to filtering data and searching */}

      <div className="searchInputs">
        {/* where we actually put input */}
        <input
          className="search-bar"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        {/* the little square */}
        {/* <div className="searchIcon">
                {wordEntered.length == 0 ? <SavedSearchIcon/> : <CloseIcon id="clearBtn" onClick={clearInput}/>}
                
            </div> */}
      </div>
      {filteredData.length !== 0 && (
        /* this shows the result */
        <div className="dataResult" value={major}>
          {filteredData.slice(0, 15).map((value, key) => {
            // loop through all elements in data
            return (
              <a
                className="dataItem"
                target="_blank"
                key={value.majorName}
                onClick={() => handleClick(value.majorName)}
              >
                {/* <p onClick={() => setMajor(value.majorName)}>{value.majorName} </p> */}
                <p>{value.majorName} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
