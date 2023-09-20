import React from "react";
// import { Layout } from "./components/Layout";
import NavMenu from "./components/NavMenu";

import OriginGroupsContainer from "./components/OriginGroupsContainer";
import "./custom.css";

export default function App() {
  return (
    <>
      <NavMenu />
      <OriginGroupsContainer />
    </>
  );

  // <Layout />;
}
