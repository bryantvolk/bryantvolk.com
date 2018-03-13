// here is a wrapper for api calls
import axios from 'axios';
// url for java server api
const baseURL = 'https://bryantvolk.com/api';

export function getReviews() {
  return axios.get(baseURL + '/reviews')
}

export function postReview(review) {
  return axios.post(baseURL + '/reviews', review);
}