import { useEffect, useState } from "react";

export function useDropDown(countries, searchTerm, setSearchTerm) {
  console.log(searchTerm);
  const initialState = {
    selectedCountry: null,
    isOpen: false,
    highlightedItemIndex: -1,
    searchText: searchTerm,
    select: (country) => select(country),
  };

  const [state, setState] = useState(initialState);

  const search = (event) => {
    const input = event.target.value;
    console.log(input);
    //TODO ask regarding updating the external state.
    setSearchTerm(input);
    setState({
      ...state,
      searchText: input,
      isOpen: true,
      selectedCountry: null,
    });
  };

  const click = () => {
    setState({ ...state, isOpen: true });
  };

  const select = (country) => {
    setState({
      ...state,
      searchText: country.name,
      selectedCountry: country,
    });
  };

  const chooseDirection = (event) => {
    const direction = event.code;
    const { highlightedItemIndex } = state;
    if (direction === "ArrowUp") {
      console.log(direction);
      setState((prevState) => {
        return {
          ...prevState,
          highlightedItemIndex:
            highlightedItemIndex - 1 > 0
              ? highlightedItemIndex - 1
              : highlightedItemIndex,
        };
      });
    } else if (direction === "ArrowDown") {
      console.log(direction);
      setState((prevState) => {
        return {
          ...prevState,
          highlightedItemIndex:
            highlightedItemIndex + 1 < countries.length
              ? highlightedItemIndex + 1
              : highlightedItemIndex,
        };
      });
    } else if (direction === "Enter") {
      const { highlightedItemIndex } = state;
      setState({ ...state, selectedCountry: countries[highlightedItemIndex] });
      // setSelectedCountry(countries[highlightedItemIndex]);
      // setSearchTerm(countries[highlightedItemIndex].name);
      // setIsOpen(false);
      // setHighlightedItemIndex(-1);
    }
  };

  const inputProps = {
    value: state.searchText,
    onChange: search,
    onClick: click,
    onKeyDown: chooseDirection,
  };

  return {
    state,
    inputProps,
    keydownHandler: chooseDirection,
  };
}
