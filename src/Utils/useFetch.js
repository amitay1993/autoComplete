import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

export function useFetch(loadOptions, searchTerm, isSelectedCountry) {
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const debouncedValue = useCallback(
    debounce((newValue) => filterData(newValue), 1500),
    []
  );

  useEffect(() => {
    if (!searchTerm) return;
    else {
      setIsLoading(true);
      debouncedValue(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (isSelectedCountry) return;
    async function fetchData() {
      try {
        const results = await loadOptions(searchTerm);
        setCountries(results);
        setIsLoading(false);
      } catch (error) {
        const { status: errorCode } = error.response;
        if (errorCode === 404) {
          console.log("country NOT found");
        }
      }
    }
    fetchData();
  }, []);

  async function filterData(value) {
    const results = await loadOptions(value);
    setCountries(results);
    setIsLoading(false);
  }

  return { countries, isLoading };
}
