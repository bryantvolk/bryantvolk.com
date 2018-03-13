import React from 'react';
import Review from '../components/Review';
import { getReviews } from '../api';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }
  componentDidMount() {
    getReviews().then(resp => {
      console.log(resp);
      const data = resp.data.data;
      this.setState({reviews: data});
    });
  }
  render() {
    return (
      <div>
        {this.state.reviews.map((review, index) => <Review title={review.title} body={review.body} timestamp={review.timestamp} key={index} />)}
      </div>
    )
  }
}

export default Reviews;