import React from 'react';

const footerStyle = {
  textAlign: 'center',
  paddingTop: '200px',
};

const Footer = () => (
  <div style={footerStyle}>
    <h3>contact info/source code:</h3><br />
    <h4><a className="smallLink" href="mailto:bryantvolk96@gmail.com">bryantvolk96@gmail.com</a></h4><br />
    <h4><a className="smallLink" href="https://github.com/bryantvolk/bryantvolk.com">repo for frontend</a></h4><br />
    <h4><a className="smallLink" href="https://github.com/bryantvolk/java-server">repo for backend</a></h4><br />
  </div>
);

export default Footer;