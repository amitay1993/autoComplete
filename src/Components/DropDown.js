import React from "react";
import AsyncDrppDown from "./AsyncDrppDown";
import SyncDropDown from "./SyncDropDown";

const DropDown = ({ loadOptions, ...props }) => {
  if (loadOptions) {
    return <AsyncDrppDown loadOptions={loadOptions} {...props} />;
  } else {
    // console.log(props);
    return <SyncDropDown {...props} />;
  }
};

export default DropDown;
