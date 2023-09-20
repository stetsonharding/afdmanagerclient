import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

import "../css/NavMenu.css";

export default function NavMenu() {
  return (
    <header>
      <Navbar className="navbar" container light>
        <NavbarBrand to="/" className="navbar-brand-container">
          <h3 className="brand">AFD Traffic Manager</h3>
        </NavbarBrand>
      </Navbar>
    </header>
  );
}
