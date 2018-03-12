import React from 'react';
import './App.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from './Main';

const App = () => (
  <div className="app">
    <Header />
    <Main />
    <Footer />
  </div>
)

export default App;
