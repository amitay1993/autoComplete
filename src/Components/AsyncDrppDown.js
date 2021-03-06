import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  CountryList,
  CountryListItem,
  Search,
} from "../Styles/DropDownStyles";
import { useDropDown } from "../Utils/useDropDown";

import styled from "styled-components";

function AsyncDropDown({
  loadOptions,
  value: selectedItem,
  onChange: setSelectedItem,
  renderInput,
}) {
  const {
    state: { isOpen, highlightedItemIndex },
    inputProps,
    inputRef,
    select,
    countries,
    isLoading,
  } = useDropDown(loadOptions, selectedItem, setSelectedItem);

  console.log(highlightedItemIndex);

  const showCountries = () => {
    //TODO:ASK regarding the loading since we clicked the input and there is no countries yet.
    return countries?.map((country, idx) => {
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
  };

  return (
    <SearchWithLoadingSpinner>
      <Search ref={inputRef}>
        <label htmlFor="countriesChoice">Choose a Country:</label>
        {selectedItem && <img src={selectedItem.flag} />}
        {renderInput(inputProps)}
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
