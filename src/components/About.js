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
          <h2>Built as a weekend project, this webapp uses:</h2><br />
          <h3><a href="https://reactjs.org/">React</a> in the frontend</h3>
          <h3>Styled with <a href="https://sass-lang.com/">SCSS</a> and <a href="https://www.w3schools.com/css/css3_flexbox.asp">flexbox</a></h3>
          <h3><a href="http://www.dropwizard.io/1.2.2/docs/">Dropwizard</a> in the backend (<a href="https://www.eclipse.org/jetty/">Jetty</a> 
          for HTTP, <a href="https://jersey.github.io/">Jersey</a> for REST, <a href="https://github.com/FasterXML/jackson">Jackson</a> for JSON)</h3>
          <h3>My domain is hosted on a DigitalOcean droplet with NGINX running as the webserver</h3><br />
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

About.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default About;