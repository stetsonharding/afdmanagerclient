import React from "react";

import "../css/OriginGroupHostName.css";

export default function OriginGroupHostName({
  isDisabled,
  filteredHostNames,
  setFilteredHostNames,
  originName,
  originHostNames,
}) {
  
  const handleCheckboxSelect = (passedID) => {
    // Deselect all other checkboxes within the same hostName
    const updatedHostNameData = filteredHostNames.map((hostNameObj) => {
      const updatedOrigins = hostNameObj.origins.map((item) => {
        if (item.id === passedID) {
          // Toggle the checkbox
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        } else {
          // return item if no match with id
          return {
            ...item,
          };
        }
      });
      return { ...hostNameObj, origins: updatedOrigins };
    });
    // updating state so check boxes are checked
    setFilteredHostNames(updatedHostNameData);
  };

  return (
    <>
   
      {originHostNames.map((hostName) => {
        return (
          <React.Fragment key={hostName.id}>
            <tr>
              <td style={{border: '1px solid black', padding: '.5rem'}}>
                <input
                  type="checkbox"
                  checked={isDisabled === false && hostName.isChecked}
                  onChange={() => handleCheckboxSelect(hostName.id)}
                  disabled={isDisabled}
                  class='checkbox'
                />
              </td>
              <td style={{border: '1px solid black', padding: '.3rem'}}>
                <label className="hostName-label">
                  <span>
                    <strong>
                      <i>{originName}</i>
                    </strong>{" "}
                    - {hostName.hostName}
                  </span>
                </label>
              </td>
              <td style={{border: '1px solid black'}}>
                {hostName.enabledState ? (
                  <p style={{ color: "green", fontWeight: "bold", textAlign: 'center', marginTop:'8px' }}>
                    Enabled
                  </p>
                ) : (
                  <p style={{ color: "red", fontWeight: "bold", textAlign: 'center', marginTop:'8px' }}>
                    Disabled
                  </p>
                )}
              </td>
            </tr>
          </React.Fragment>
        );
      })}

     <br/>
    </>
  );
}
