// here is a wrapper for api calls
import axios from 'axios';
// url for java server api
const baseURL = 'http://bryantvolk.com:8080';

export function getReviews() {
  return axios.get(baseURL + '/reviews')
}