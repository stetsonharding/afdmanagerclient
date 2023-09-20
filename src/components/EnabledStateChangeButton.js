import React from "react";

import "../css/EnabledStateChangeButton.css";

function EnabledStateChangeButton({ setEnabledStateChanges, filteredHostNames, isDisabled, setFilteredHostNames,setIsDisabled }) {

  
  //function to change the enabledState property on any checkbox that is checked.
  const handleFallIn = () => {
    // Mapping over hostNameData array
    const updatedEnabledState = filteredHostNames.map((hostName) => {
      // mapping over origins array and setting the enabledState to true if the checkbox is checked.
      const updatedOrigins = hostName.origins.map((item) => {
        if (item.isChecked) {
          // Toggle enabledState if originHostName matches
          return {
            ...item,
            enabledState: true,
          };
        }
        return item;
      });
      // Updating origins array within each hostName object
      return { ...hostName, origins: updatedOrigins };
    });
      //Passing enabledState changes for post request.
      setIsDisabled(true)
      sendPostRequest(updatedEnabledState)
      setFilteredHostNames([])
    
  };


    //function to change the enabledState property on any checkbox that is checked.
    const handleFallOut = () => {
      // Mapping over hostNameData array
      const updatedEnabledState = filteredHostNames.map((hostName) => {
    
        // mapping over origins array and setting the enabledState to true if the checkbox is checked.
        const updatedOrigins = hostName.origins.map((item) => {
          if (item.isChecked) {
            // Toggle enabledState if originHostName matches
            return {
              ...item,
              enabledState: false,
            };
          }
       
          return item;

        });
     
        // Updating origins array within each hostName object
        return { ...hostName, origins: updatedOrigins };
      });
       //Passing enabledState changes for post request.
       sendPostRequest(updatedEnabledState)
       setFilteredHostNames([])
       setIsDisabled(true)
    
    };




  //function to send data to the server (testing)
  const sendPostRequest = async (updatedState) => {
    //Call toggleState to get body for postRequest
    // const enabledState = handleEnableState();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedState),
    };

    try {
      var response = await fetch(
        "https://localhost:44455/afd/origingroups",
        options
      );

      if (response.status >= 200 && response.status < 300) {
        //Change enabledStateChange to re-render
        //orginGroupContainer useEffect (need diffrent solution)
        setEnabledStateChanges(updatedState);
        /*====== */
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
      <button
        className="hostNameState-button enable-btn"
        onClick={() => handleFallIn()}
        disabled={isDisabled}
       
      >
        Fall In
      </button>
      <button
        className="hostNameState-button disable-btn"
        onClick={() => handleFallOut()}
        disabled={isDisabled}
      >
        Fall Out
      </button>
    </div>
  );
}

export default EnabledStateChangeButton;
