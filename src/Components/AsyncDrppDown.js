import React, { useEffect, useRef, useState } from "react";
import { CountryList, Search } from "../Styles/DropDownStyles";
import { useDropDown } from "../Utils/useDropDown";
import { useFetch } from "../Utils/useFetch";

function AsyncDropDown({
  loadOptions,
  value: searchTerm,
  onChange: setSearchTerm,
}) {
  useDropDown(searchTerm, setSearchTerm);
  const { countries, isLoading } = useFetch(loadOptions, searchTerm);
  console.log(countries, isLoading);
  const inputRef = useRef();

  return (
    <Search ref={inputRef}>
      <label htmlFor="countriesChoice">Choose a Country:</label>
      {/*{selectedCountry && <img src={selectedCountry.flag} />}*/}
      <input
      // autoComplete="off"
      // maxLength="1"
      // // onClick={() => setIsOpen(true)}
      // onChange={search}
      // type="text"
      // id="countriesChoice"
      // placeholder="Enter Country"
      // value={searchTerm}
      />

      {/*{isOpen && <CountryList>{}</CountryList>}*/}
    </Search>
  );
}

export default AsyncDropDown;
