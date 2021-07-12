import { useEffect, useState } from "react";

export function useFetch(loadOptions, searchTerm) {
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const results = await loadOptions(searchTerm);
        setCountries(results.map((country) => <p>{country.name}</p>));
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
