import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import WelcomeView from './welcome/WelcomeView';
import QuestionView from './question/QuestionView';

import './App.scss';

const App = () => {
  return (
    <div className="app">

      <Router>
        <Switch>
          <Route path="/welcome">
            <WelcomeView />
          </Route>
          <Route path="/questions">
            <QuestionView />
          </Route>
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
