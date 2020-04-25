import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import WelcomeView from './welcome/WelcomeView';
import QuestionsView from './questions/QuestionsView';
import ResultView from './result/ResultView';

import './App.scss';

const App: React.FC<{}> = () => {
  return (
    <div className="app">

      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome">
            <WelcomeView />
          </Route>
          <Route path="/questions/d/:difficulty/c/:category">
            <QuestionsView />
          </Route>
          <Route path="/result">
            <ResultView />
          </Route>
          <Route path='*' exact>
            <Redirect to="/welcome" />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
