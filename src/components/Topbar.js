import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Jss from "react-jss";
import Link from 'react-router-dom/Link';

const styles = {
  topbar: {
    // borderRadius: 0
  }
};

const Topbar = ({ classes }) => {
  return (
    <Navbar inverse collapseOnSelect className={classes.topbar} >
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>Anatomy Dictionary</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          {/* <LinkContainer to="/home">
            <NavItem>Home</NavItem>
          </LinkContainer> */}
          <LinkContainer to="/dict">
            <NavItem>Dictionary</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Jss(styles)(Topbar);