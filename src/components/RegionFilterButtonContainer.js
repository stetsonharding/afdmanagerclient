import React from "react";

import { Container, Row, Col } from "reactstrap";
import { RegionButtonData } from "../RegionButtonData";
import RegionFilterButton from "./RegionFilterButton";

function RegionFilterButtonContainer({
  hostNameData,
  setIsDisabled,
  setFilteredHostNames,
  setIsCheckboxChecked,
  handleReadOnlyClick,
  regionalBtnID,
  setRegionalBtnID
}) {

  return (
    <Container className="d-flex justify-content-center align-items-center">
          {/* Button for Read-Only - May need its own component? */}
      <button className={regionalBtnID === null ? "region-button-clicked" : 'region-button'} onClick={() => handleReadOnlyClick()}>
        View All
      </button>
      <Row style={{ width: "100%" }}>
        <Col className="d-flex justify-content-around">
          {RegionButtonData.map((buttonData) => {
            return (
              <RegionFilterButton
                key={buttonData.id}
                buttonData={buttonData}
                hostNameData={hostNameData}
                setIsDisabled={setIsDisabled}
                setFilteredHostNames={setFilteredHostNames}
                setIsCheckboxChecked={setIsCheckboxChecked}
                regionalBtnID={regionalBtnID}
                setRegionalBtnID={setRegionalBtnID}
              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default RegionFilterButtonContainer;
