import axios from "axios";

export function loadOptions(searchTerm = "") {
  if (!searchTerm) {
    return axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      return res.data.map((country) => {
        return { name: country.name, flag: country.flag };
      });
    });
  } else {
    console.log("test");
    return axios
      .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
      .then((res) => {
        return res.data.map((country) => {
          return { name: country.name, flag: country.flag };
        });
      });
  }
}
