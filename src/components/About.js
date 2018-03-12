import React from 'react';
import PropTypes from 'prop-types';

/**
 * modal for site info
 */
class About extends React.Component {
  render() {
    // only render on click
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: 'inheret',
      borderColor: 'rgb(76, 0, 160)',
      borderRadius: 5,
      borderStyle: 'solid',
      maxWidth: 500,
      margin: 'auto',
      padding: 30,
      textAlign: 'center',
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <h2>Built as a weekend (plus a few days) project, this webapp uses:</h2>
          <h4>React in the frontend</h4>
          <h4>Styled with SCSS and flexbox</h4>
          <h4>Dropwizard in the backend (Jetty for HTTP, Jersey for REST, Jackson for JSON)</h4>
          <h4>My domain is hosted on a DigitalOcean droplet with NGINX running as the webserver</h4>
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}

About.PropTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default About;