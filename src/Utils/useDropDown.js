import { useEffect, useRef, useState } from "react";
import { useFetch } from "./useFetch";
import { calcCorrectIndex } from "./calcCorrectIndex";

export function useDropDown(loadOptions, selectedItem, setSelectedItem) {
  const initialState = {
    isOpen: false,
    highlightedItemIndex: 0,
    searchText: "",
  };

  const [state, setState] = useState(initialState);
  const { countries, isLoading } = useFetch(
    loadOptions,
    state.searchText,
    selectedItem
  );
  const inputRef = useRef(null);

  const onChange = (event) => {
    const input = event.target.value;
    setSelectedItem(null);
    // queue = [setState, setState, setState]
    // setState((state) => ({ ...state, }))
    setState((prevState) => {
      return {
        ...prevState,
        searchText: input,
        isOpen: true,
      };
    });
  };

  const click = () => {
    if (state.isOpen) return;
    setState((prevState) => {
      return { ...prevState, isOpen: true };
    });
  };

  const select = (country) => {
    setSelectedItem(country);
    setState((prevState) => {
      return {
        ...state,
        searchText: country.name,
        isOpen: false,
        highlightedItemIndex: -1,
      };
    });
  };

  const onKeyDown = (event) => {
    const keyCode = event.code;
    let { highlightedItemIndex } = state;

    switch (keyCode) {
      case "ArrowUp":
        highlightedItemIndex--;
        break;
      case "ArrowDown":
        highlightedItemIndex++;
        console.log({ highlightedItemIndex });

        break;
      case "Enter":
        select(countries[highlightedItemIndex]);
        break;
      default:
        return;
    }

    const calculatedIndex = calcCorrectIndex(highlightedItemIndex, countries);

    setState((prevState) => {
      return {
        ...prevState,
        highlightedItemIndex: calculatedIndex,
      };
    });
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

  useEffect(() => {
    if (!isLoading) {
      setState((prevState) => {
        return {
          ...prevState,
          isOpen: true,
        };
      });
    }
  }, [isLoading]);

  const inputProps = {
    value: state.searchText,
    onChange: onChange,
    onClick: click,
    onKeyDown: onKeyDown,
  };

  return {
    state,
    inputProps,
    inputRef,
    keydownHandler: onKeyDown,
    select,
    countries,
    isLoading,
  };
}
