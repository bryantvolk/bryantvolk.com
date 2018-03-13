import React from 'react';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import { getReviews } from '../api';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      formOpen: false
    }
  }

  toggleForm = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }

  componentDidMount() {
    getReviews().then(resp => {
      console.log(resp);
      const data = resp.data.data;
      this.setState({reviews: data});
    });
  }
  render() {
    if (this.state.formOpen) {
      return (
        <div>
          <button style={{marginTop: '20px'}} onClick={this.toggleForm}>Close form</button>
          <ReviewForm show={this.state.formOpen} onClose={this.toggleForm} />
          <div style={{display: 'flex'}}>
          {this.state.reviews.map((review, index) => 
            <Review title={review.title} body={review.body} timestamp={review.timestamp} 
            image={review.image} link={review.link} author={review.author} key={index} />)}
          </div>
      </div>
      )
    }
    return (
      <div>
        <button style={{marginTop: '20px'}}onClick={this.toggleForm}>Add Review</button>
        <ReviewForm show={this.state.formOpen} onClose={this.toggleForm} />
        <div style={{display: 'flex', flexFlow: "row wrap"}}>
        {this.state.reviews.map((review, index) => 
          <Review title={review.title} body={review.body} timestamp={review.timestamp} 
          image={review.image} link={review.link} author={review.author} key={index} />)}
        </div>
      </div>
    )
  }
}

export default Reviews;