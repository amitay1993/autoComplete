import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Container,
  CountryList,
  CountryListItem,
  Search,
} from "../Styles/DropDownStyles";
import { useDropDown } from "../Utils/useDropDown";

function SyncDropDown({ value: searchTerm, options, onChange: setSearchTerm }) {
  const { countries } = options;
  //console.log(countries);
  const {
    state: {
      isOpen,
      selectedCountry,
      searchText,
      highlightedItemIndex,
      select,
    },
    inputProps,
  } = useDropDown(countries, searchTerm, setSearchTerm);

  //console.log(highlightedItemIndex);
  //console.log(inputProps);
  //console.log({ state });

  const inputRef = useRef(null);

  // const search = (event) => {
  //   const input = event.target.value;
  //   setSearchTerm(input);
  //   setSelectedCountry(null);
  // };

  // const select = (country) => {
  //   setSelectedCountry({ name: country.name, flag: country.flag });
  //   setSearchTerm(country.name);
  //   setHighlightedItemIndex(-1);
  //   setIsOpen(false);
  // };

  const showCountries = () => {
    let filteredCountries;
    if (selectedCountry) {
      filteredCountries = options.countries.map((country, idx) => {
        return (
          <CountryListItem
            data-focused={idx === highlightedItemIndex}
            data-selected={selectedCountry?.name === country.name}
            onClick={() => select(country)}
            key={country.name}
          >
            <Container>
              <img src={country.flag} />
              <span>{country.name}</span>
            </Container>
          </CountryListItem>
        );
      });
    } else {
      filteredCountries = countries
        .filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((country, idx) => {
          return (
            <CountryListItem
              data-focused={idx === highlightedItemIndex}
              data-selected={selectedCountry?.name === country.name}
              onClick={() => select(country)}
              key={country.name}
            >
              <Container>
                <img src={country.flag} />
                <span>{country.name}</span>
              </Container>
            </CountryListItem>
          );
        });
    }
    return filteredCountries;
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (inputRef.current && !inputRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [inputRef]);

  return (
    <Search ref={inputRef}>
      <label htmlFor="countriesChoice">Choose a Country:</label>
      {selectedCountry && <img src={selectedCountry.flag} />}
      <input {...inputProps} />

      {isOpen && <CountryList>{showCountries()}</CountryList>}
    </Search>
  );
}

export default SyncDropDown;
