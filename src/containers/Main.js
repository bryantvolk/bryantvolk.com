import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Reviews from './Reviews';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/reviews' component={Reviews} />
    </Switch>
  </main>
);

export default Main;