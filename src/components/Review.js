import React from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {
  render() {
    return (
      <div>
        <h1>Title: {this.props.title}</h1>
        <h4>Body: {this.props.body}</h4>
        <span>Date: {this.props.timestamp}</span>
      </div>
    );
  }
}

Review.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}
export default Review;