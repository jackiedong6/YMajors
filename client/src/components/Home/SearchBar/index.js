import React, { useState } from "react";
import "./index.scss";
const MIN_DISTANCE = 20;

// import the levenshtein algorithm for typo-tolerant search
const levenshtein = require("js-levenshtein");

// the compoemnts takes two different props: placeholder and data
function SearchBar({ placeholder, data, onChange }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

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

  const handleClick = (value) => {
    onChange(value);
    setWordEntered(value);
    setFilteredData([]);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          className="search-bar"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className="dataItem"
                target="_blank"
                key={key}
                onClick={() => handleClick(value.majorName)}
              >
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
