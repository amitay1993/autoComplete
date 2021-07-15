import { useEffect, useRef, useState } from "react";
import { useFetch } from "./useFetch";

export function useDropDown(selectedItem, setSelectedItem, countries = []) {
  const initialState = {
    isOpen: false,
    highlightedItemIndex: -1,
    searchText: "",
    select: (country) => select(country),
  };

  const [state, setState] = useState(initialState);
  const inputRef = useRef(null);

  const search = (event) => {
    const input = event.target.value;
    setSelectedItem(null);
    setState({
      ...state,
      searchText: input,
      isOpen: true,
    });
  };

  const click = () => {
    setState({ ...state, isOpen: true });
  };

  const select = (country) => {
    setSelectedItem(country);
    setState({
      ...state,
      searchText: country.name,
      isOpen: false,
    });
  };

  const chooseDirection = (event) => {
    const direction = event.code;
    const { highlightedItemIndex } = state;
    console.log(direction);
    if (direction === "ArrowUp") {
      setState((prevState) => {
        return {
          ...prevState,
          highlightedItemIndex:
            highlightedItemIndex - 1 >= 0
              ? highlightedItemIndex - 1
              : highlightedItemIndex,
        };
      });
    } else if (direction === "ArrowDown") {
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
      setState({
        ...state,
        selectedCountry: countries[highlightedItemIndex],
        searchText: countries[highlightedItemIndex].name,
        isOpen: false,
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // setIsOpen(false);
        console.log(state);
        //TODO: setState(...state,isOpen:false) causing changes to other data from the state.
        setState((state) => ({ ...state, isOpen: false }));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  const inputProps = {
    value: state.searchText,
    onChange: search,
    onClick: click,
    onKeyDown: chooseDirection,
  };

  return {
    state,
    inputProps,
    inputRef,
    keydownHandler: chooseDirection,
  };
}
