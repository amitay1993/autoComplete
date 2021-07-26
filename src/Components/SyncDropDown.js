import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Container,
  CountryList,
  CountryListItem,
  Search,
} from "../Styles/DropDownStyles";
import { useDropDown } from "../Utils/useDropDown";

function SyncDropDown({
  value: searchTerm,
  options: countries,
  onChange: setSearchTerm,
}) {
  const {
    state: {
      isOpen,
      selectedCountry,
      searchText,
      highlightedItemIndex,
      select,
    },
    inputProps,
    inputRef,
  } = useDropDown(searchTerm, setSearchTerm, countries);

  const showCountries = () => {
    let filteredCountries;
    if (selectedCountry) {
      filteredCountries = countries.map((country, idx) => {
        return (
          <CountryListItem
            isFocused={idx === highlightedItemIndex}
            isSelected={selectedCountry?.name === country.name}
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
          country.name.toLowerCase().includes(searchText.toLowerCase())
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
