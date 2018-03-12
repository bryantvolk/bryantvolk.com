import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import About from './About';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  
  render() {
    const linkStyle = {
      textDecoration: 'none',
      color: 'green',
      fontSize: '36px',
    };

    return (
    <div className="bar">
      <div className="child">
        <Link to='/' style={linkStyle}>Home</Link>
      </div>
      <div className="child">
        <Link to='/reviews' style={linkStyle}>Reviews</Link>
      </div>
      <div className="child">
        <Link to='/hn' style={linkStyle}>Hacker News</Link>
      </div>
      <div className="about">
        <button onClick={this.toggleModal}>
          About
        </button>

        <About show={this.state.isOpen}
          onClose={this.toggleModal}>
        </About>
      </div>
    </div>
    );
  }
}


export default Header;