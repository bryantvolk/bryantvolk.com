import React from 'react';
import PropTypes from 'prop-types';
class Review extends React.Component {
  render() {
    const reviewStyle = {
      maxWidth: '300px',
      margin: 'auto',
      padding: '20px',
      borderStyle: 'solid',
      marginTop: '10px',
    }
    return (
      <div className="review" style={reviewStyle}>
        <h1>{this.props.title}</h1>
        <span className="poster"><img src={this.props.image} style={{padding: '15px'}} alt="movie poster"/></span>
        <p>{this.props.body}</p><br />
        <span>Submitted on: {this.props.timestamp.slice(0, 10)}</span><br />
        <span><a href={this.props.link}>Original link</a><br /> written by {this.props.author}</span>
      </div>
    );
  }
}

Review.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}
export default Review;