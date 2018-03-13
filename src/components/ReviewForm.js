import React from 'react';
import { postReview } from '../api.js';
class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      image: '',
      link: '',
      author: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const review = {
      title: this.state.title,
      body: this.state.body,
      image: this.state.image,
      link: this.state.link,
      author: this.state.author
    }
    postReview(review).then(resp => {
      console.log(resp);
      this.forceUpdate();
    })
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <form style={{padding: '20px'}}onSubmit={this.handleSubmit}>
        <label>
          <strong>Title: </strong>
          <input type="text" name="title" onChange={this.handleChange} />
        </label><br /><br />
        <label>
        <strong>Body: </strong>
          <input type="text" name="body" value={this.state.body} onChange={this.handleChange} />
        </label><br /><br />
        <label>
        <strong>Image link: </strong>
          <input type="text" name="image" value={this.state.image} onChange={this.handleChange} />
        </label><br /><br />
        <label>
        <strong>Author: </strong>
          <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
        </label><br /><br />
        <label>
        <strong>Link: </strong>
          <input type="text" name="link" value={this.state.link} onChange={this.handleChange} />
        </label><br /><br />
        <input type="submit" value="Add review" />
      </form>
    );
  }
}

export default ReviewForm;