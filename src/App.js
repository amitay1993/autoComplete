import "./App.css";
import DropDown from "./Components/DropDown";
import { useState } from "react";

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
        renderInput={(inputProps) => <input {...inputProps} />}
      />
    </div>
  );
}

export default App;
