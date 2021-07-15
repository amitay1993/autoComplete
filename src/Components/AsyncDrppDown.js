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
  value: selectedItem,
  onChange: setSelectedItem,
}) {
  useDropDown(selectedItem, setSelectedItem);
  const {
    state: { isOpen, searchText, highlightedItemIndex, select },
    inputProps,
    inputRef,
  } = useDropDown(selectedItem, setSelectedItem);
  const { countries, isLoading } = useFetch(
    loadOptions,
    searchText,
    selectedItem
  );

  console.log(selectedItem);

  const showCountries = () => {
    return countries.map((country, idx) => {
      return (
        <CountryListItem
          data-focused={idx === highlightedItemIndex}
          data-selected={selectedItem?.name === country.name}
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
  };

  return (
    <SearchWithLoadingSpinner>
      <Search ref={inputRef}>
        <label htmlFor="countriesChoice">Choose a Country:</label>
        {selectedItem && <img src={selectedItem.flag} />}
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
