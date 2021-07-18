import "./App.css";
import DropDown from "./Components/DropDown";
import data from "./Utils/countryData";
import { useState } from "react";
import styled from "styled-components";
import { loadOptions } from "./Utils/loadOptions";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <DropDown
        // onSearchInputChange={(searchText) => dispatch(getCoutries())}
        // options={options}
        loadOptions={loadOptions}
        onChange={setSelectedItem}
        value={selectedItem}
      />
    </div>
  );
}

export default App;
