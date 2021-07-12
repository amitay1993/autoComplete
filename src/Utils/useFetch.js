import { useEffect, useState } from "react";

export function useFetch(loadOptions, searchTerm, isSelectedCountry) {
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
  }, [searchTerm]);

  return { countries, isLoading };
}
