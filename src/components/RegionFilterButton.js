import React from "react";
import { Button } from "reactstrap";
import "../css/RegionFilterButton.css";

export default function RegionFilterButton({
  buttonData,
  hostNameData,
  setIsDisabled,
  setFilteredHostNames,
  setIsCheckboxChecked,
  regionalBtnID,
  setRegionalBtnID
}) {
  //function to set the ID of button clicked to change background of btn clicked.
  const regionFilterBackgroundChange = (btnID) => {
    setRegionalBtnID(btnID);
  };

  //Filter hostNames based on what region the user clicks
  const filterHostNames = (hostNameData, btnName, btnID) => {
    //getting id of button clicked
    regionFilterBackgroundChange(btnID);
    //Enable Checkboxes
    setIsDisabled(false);
    // ==
    let copy = [...hostNameData];
    // Create a new array containing the filtered data
    let filteredItems = [];
    setFilteredHostNames([]);

    // Filtering out all items with isChecked === true
    copy.forEach((hostName) => {
      const filteredOrigins = hostName.origins.filter(
        (item) => item.hostName === btnName
      );
      if (filteredOrigins.length > 0) {
        filteredItems.push({ ...hostName, origins: filteredOrigins });
      }
    });
    // Update the filteredHostNames state with the new filtered array
    setFilteredHostNames(filteredItems);

    //Unchecking "checkbox" table header
    setIsCheckboxChecked(false)
  };

  return (
    <div className="region-filter-button-container">
      <Button
        onClick={() =>
          filterHostNames(hostNameData, buttonData.value, buttonData.id)
        }
        className={
         regionalBtnID === buttonData.id
            ? "region-button-clicked"
            : "region-button"
        }
      >
        {buttonData.name}
      </Button>
    </div>
  );
}
