import React from 'react';
import logo from '../assets/react.svg';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <img src={logo} alt='Logo'/>
        Homepage
      </div>
    );
  }
}

export default Home;
