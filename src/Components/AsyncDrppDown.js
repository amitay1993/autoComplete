import React, { useEffect, useRef, useState } from "react";
import { CountryList, Search } from "../Styles/DropDownStyles";

function AsyncDropDown({
  loadOptions,
  value: searchTerm,
  onChange: setSearchTerm,
}) {
  const [selectedCountry, setSelectedCountry] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedItemIndex, setHighlightedItemIndex] = useState(-1);

  const inputRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const result = await loadOptions(searchTerm);
    }
    fetchData();
  }, []);

  const search = (event) => {
    const input = event.target.value;
  };

  return (
    <Search ref={inputRef}>
      <label htmlFor="countriesChoice">Choose a Country:</label>
      {selectedCountry && <img src={selectedCountry.flag} />}
      <input
        autoComplete="off"
        maxLength="1"
        onClick={() => setIsOpen(true)}
        onChange={search}
        type="text"
        id="countriesChoice"
        placeholder="Enter Country"
        value={searchTerm}
      />

      {/*{isOpen && <CountryList>{showCountries()}</CountryList>}*/}
    </Search>
  );
}

export default AsyncDropDown;
