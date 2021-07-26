import "./App.css";
import DropDown from "./Components/DropDown";
import { useState } from "react";

import { loadOptions } from "./Utils/loadOptions";
import data from "./Utils/countryData";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <DropDown
        options={data}
        onChange={setSelectedItem}
        value={selectedItem}
        renderInput={(inputProps) => <input {...inputProps} />}
      />
    </div>
  );
}

export default App;
