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
  value: selectedItem,
  options,
  onChange: setSelectedItem,
}) {
  const {
    state: { isOpen, searchText, highlightedItemIndex },
    select,
    inputProps,
    inputRef,
  } = useDropDown({ selectedItem, options, setSelectedItem });

  const countries = options;
  const showCountries = () => {
    let filteredCountries;
    if (selectedItem) {
      filteredCountries = countries.map((country, idx) => {
        return (
          <CountryListItem
            isFocused={idx === highlightedItemIndex}
            isSelected={selectedItem?.name === country.name}
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
              isFocused={idx === highlightedItemIndex}
              isSelected={selectedItem?.name === country.name}
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
      {selectedItem && <img src={selectedItem.flag} />}
      <input {...inputProps} />
      {isOpen && <CountryList>{showCountries()}</CountryList>}
    </Search>
  );
}

export default SyncDropDown;
