import "./App.css";
import DropDown from "./Components/DropDown";
import data from "./Utils/countryData";
import { useState } from "react";
import styled from "styled-components";
import { loadOptions } from "./Utils/loadOptions";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <DropDown
        loadOptions={loadOptions}
        onChange={setSearchTerm}
        value={searchTerm}
        options={{ countries: data }}
      />
    </div>
  );
}

export default App;
