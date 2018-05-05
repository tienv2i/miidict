import React from 'react';
import Jss from 'react-jss';
import { InputGroup , Dropdown, MenuItem } from 'react-bootstrap';
const style = {
  tahContainer: {

  }
};

const WordSearchBox = props => {
  return (
    <Dropdown id='search-box'>
      <Dropdown.Toggle>
        Toggle
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="1">Test dropdown 1</MenuItem>
        <MenuItem eventKey="2">Test dropdown 2</MenuItem>
        <MenuItem eventKey="3">Test dropdown 3</MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Jss(style)(WordSearchBox);