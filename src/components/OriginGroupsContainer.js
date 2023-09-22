import React, { useState, useEffect } from "react";
import "../css/OriginGroupsContainer.css";

import { Container } from "reactstrap";

//Components
import RegionFilterButtonContainer from "./RegionFilterButtonContainer";
import EnabledStateChangeButton from "./EnabledStateChangeButton";
import OriginGroupHostName from "./OriginGroupHostName";
import Loader from "./Loader";

function OriginGroupsContainer() {
  //state for origin names, hostNames, and enabled state.
  const [hostNameData, setHostNameData] = useState([]);
  //State for error messages
  const [error, setError] = useState("");
  //State to store enabled state changes to be sent as a post request
  const [enabledStateChanges, setEnabledStateChanges] = useState([]);
  //State for enable/disable checkboxes and enableState buttons
  const [isDisabled, setIsDisabled] = useState(true);
  //State for filtered hostNames
  const [filteredHostNames, setFilteredHostNames] = useState([]);
  //Checking / Unchecking checkbox for table header **Need better solution?**
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  //State to store ID of regional button clicked
  const [regionalBtnID, setRegionalBtnID] = useState(null);
  //Loading state to show loader while getting data
  const [loading, setLoading] = useState(false);

  const getOriginGroupNames = async () => {
    //Unchecking table header checkbox
    //clearing out hostNameData to store new data
    setIsCheckboxChecked(false);
    setHostNameData([]);
    setRegionalBtnID(null);
    setLoading(true);
    try {
      const options = {
        headers: {
          "X-Mockery":
            '{"apiKey": "c18f4249-a3f6-48cc-a1d2-7bdce0320ec5", "environment": "Production", "endpoints": [{ "method": "GET", "endpoint": "https://azuremanagementfd-staging--wtrccu5.happyflower-541968ec.westus3.azurecontainerapps.io/afd/origingroups"}], "tag": ""}',
        },
      };
      //Set loader to true until data is fetched or an error has occured
      setLoading(true);
      // Fetching all Origin Group Names.
      const promise = await fetch(
        "https://azuremanagementfd-staging--wtrccu5.happyflower-541968ec.westus3.azurecontainerapps.io/afd/origingroups",
        options
      );
      const originName = await promise.json();

      // Iterating through each Origin Group Name and fetching each individual Origin Group
      // and storing it in state.
      originName.map(async (name) => {
        try {
          const response = await fetch(
            `https://azuremanagementfd-staging--wtrccu5.happyflower-541968ec.westus3.azurecontainerapps.io/afd/origingroups/${name}`,
            options
          );
          const hostName = await response.json();

          // Add 'isChecked' property and an ID to every object in the 'origins' array
          const updatedOrigins = hostName.origins.map((origin) => ({
            ...origin,
            isChecked: false,
            id: crypto.randomUUID(),
          }));

          // Update the 'origins' array with the modified objects
          const updatedHostName = [{ ...hostName, origins: updatedOrigins }];

          // Updating the state by appending the fetched and updated hostName to the previous state
          setHostNameData((prevState) => [...prevState, ...updatedHostName]);
          //set loading to false to stop spinner
          setLoading(false);
        } catch (err) {
          // If there's an error fetching an individual Origin Group, set the error state
          setError(err.message);
        }
      });
    } catch (err) {
      // If there's an error fetching the origin group names, set the error state
      setError(err.message);
      setLoading(false);
    }
  };

  const handleReadOnlyClick = () => {
    getOriginGroupNames();
    setFilteredHostNames([]);
    setIsDisabled(true);
  };

  // Fetching all origin group names and hostNames
  useEffect(() => {
    setHostNameData([]);

    // Calling the function to fetch origin group names when the component mounts
    getOriginGroupNames();
  }, [enabledStateChanges]);

  //Toggle all checkboxes checked/unchecked
  const toggleCheckBoxes = () => {
    // Mapping over host names that are filtered
    const updatedHostNameData = filteredHostNames.map((hostName) => {
      // Mapping over origins array within each hostName object
      const CheckedFilteredHostNames = hostName.origins.map((origin) => {
        return {
          ...origin,
          isChecked: !origin.isChecked,
        };
      });
      // Updating origins array within each hostName object
      return { ...hostName, origins: CheckedFilteredHostNames };
    });

    // Updating state to checkboxes are checked

    setFilteredHostNames(updatedHostNameData);
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <Container style={{ marginTop: ".5rem" }}>
      <RegionFilterButtonContainer
        hostNameData={hostNameData}
        setIsDisabled={setIsDisabled}
        setFilteredHostNames={setFilteredHostNames}
        setIsCheckboxChecked={setIsCheckboxChecked}
        regionalBtnID={regionalBtnID}
        setRegionalBtnID={setRegionalBtnID}
        handleReadOnlyClick={handleReadOnlyClick}
        />
      <span id="span-title">Origin Groups</span>
      <div style={{ textAlign: "center" }}>
        {/* Display error to user */}
        {error && <p><b>{error}!</b></p>}
        {/*Display Loader */}
        <Loader loading={loading} />
      </div>
      <div className="origin-groups-container">
        {/* If there are no filtered origin groups then render all origin groups */}
        <table style={{ width: "100%" }}>
          <tbody>
            <tr
              style={{
                backgroundColor: "lightgrey",
                position: "sticky",
                top: "0",
                borderRadius: "5px",
              }}
            >
              <th
                style={{
                  width: "180px",
                  border: "1px solid black",
                  padding: ".5rem",
                }}
              >
                <input
                  type="checkbox"
                  disabled={isDisabled}
                  onClick={(e) => toggleCheckBoxes(e)}
                  checked={isCheckboxChecked}
                  class="checkbox"
                />
              </th>
              <th style={{ border: "1px solid black" }}>ORIGINS</th>
              <th
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  width: "220px",
                }}
              >
                STATE
              </th>
            </tr>
            {!filteredHostNames.length
              ? hostNameData &&
                hostNameData.map((origin) => {
                  return (
                    <OriginGroupHostName
                      key={origin.name}
                      originName={origin.name}
                      originHostNames={origin.origins}
                      isDisabled={isDisabled}
                      isChecked={origin.isChecked}
                      filteredHostNames={filteredHostNames}
                      setFilteredHostNames={setFilteredHostNames}
                    />
                  );
                })
              : //Rendering filtered origin groups
                filteredHostNames.map((origin, index) => {
                  return (
                    <OriginGroupHostName
                      key={origin.name}
                      originName={origin.name}
                      originHostNames={origin.origins}
                      setFilteredHostNames={setFilteredHostNames}
                      filteredHostNames={filteredHostNames}
                      isDisabled={isDisabled}
                    />
                  );
                })}
          </tbody>
          {/* <Loader loading={loading}/> */}
        </table>
      </div>
      <EnabledStateChangeButton
        isDisabled={isDisabled}
        setEnabledStateChanges={setEnabledStateChanges}
        filteredHostNames={filteredHostNames}
        setFilteredHostNames={setFilteredHostNames}
        setIsDisabled={setIsDisabled}
      />
    </Container>
  );
}

export default OriginGroupsContainer;
