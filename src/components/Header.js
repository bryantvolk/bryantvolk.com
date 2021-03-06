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
      fontSize: '24px',
    };

    return (
    <div className="bar">
      <h1 className="child">Bryantvolk.com</h1>
      <div className="child">
        <Link to='/' style={linkStyle}>Home</Link>
      </div>
      <div className="child">
        <Link to='/reviews' style={linkStyle}>Movie Reviews</Link>
      </div>
      {/* <div className="child">
        <Link to='/hn' style={linkStyle}>Hacker News</Link>
      </div> */}
      <div className="about" style={{paddingLeft: '10px'}}>
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