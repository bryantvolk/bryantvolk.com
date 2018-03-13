import React from 'react';

const footerStyle = {
  textAlign: 'center',
  paddingTop: '200px',
};

const Footer = () => (
  <div style={footerStyle}>
    <h3>contact info/source code:</h3><br />
    <h4><a href="mailto:bryantvolk96@gmail.com">bryantvolk96@gmail.com</a></h4><br />
    <h4><a href="https://github.com/bryantvolk/bryantvolk.com">github for frontend</a></h4><br />
    <h4><a href="https://github.com/bryantvolk/java-server">backend</a></h4><br />
  </div>
);

export default Footer;