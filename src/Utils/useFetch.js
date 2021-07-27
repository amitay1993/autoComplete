import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

export function useFetch(loadOptions, searchTerm = "", isSelectedCountry) {
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(newValue) {
    try {
      if (loadOptions) {
        const results = await loadOptions(newValue);
        setCountries(results);
        setIsLoading(false);
      }
    } catch (error) {
      const { status: errorCode } = error.response;
      if (errorCode === 404) {
        console.log("country NOT found");
      }
    }
  }

  const debouncedValue = useCallback(
    debounce((newValue) => fetchData(newValue), 700),
    []
  );

  useEffect(() => {
    if (isSelectedCountry) return;
    setIsLoading(true);
    debouncedValue(searchTerm);
  }, [debouncedValue, isSelectedCountry, searchTerm]);

  return { countries, isLoading };
}
