import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  CountryList,
  CountryListItem,
  Search,
} from "../Styles/DropDownStyles";
import { useDropDown } from "../Utils/useDropDown";
import { useFetch } from "../Utils/useFetch";
import styled from "styled-components";

function AsyncDropDown({
  loadOptions,
  value: searchTerm,
  onChange: setSearchTerm,
}) {
  useDropDown(searchTerm, setSearchTerm);
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
  } = useDropDown(searchTerm, setSearchTerm);
  const { countries, isLoading } = useFetch(
    loadOptions,
    searchText,
    selectedCountry
  );

  console.log(selectedCountry, isLoading);

  const showCountries = () => {
    let filteredCountries;
    if (selectedCountry) {
      // console.log("test");
      // console.log(countries);
      filteredCountries = countries.map((country, idx) => {
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
    <SearchWithLoadingSpinner>
      <Search ref={inputRef}>
        <label htmlFor="countriesChoice">Choose a Country:</label>
        {selectedCountry && <img src={selectedCountry.flag} />}
        <input {...inputProps} />

        {isOpen && <CountryList>{showCountries()}</CountryList>}
      </Search>
      {isLoading && <div className="loader">Loading...</div>}
    </SearchWithLoadingSpinner>
  );
}

const SearchWithLoadingSpinner = styled.div`
  display: flex;
  margin: 1.5rem;
`;

export default AsyncDropDown;
