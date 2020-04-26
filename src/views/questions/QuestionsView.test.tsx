import React from 'react';
import {
  render,
} from '@testing-library/react';
import QuestionsView from './QuestionsView';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

test('renders without any crash', () => {
  const history = createMemoryHistory();
  
  render(
    <Router history={history}>
      <QuestionsView />
    </Router>
  );
});


test('should crash when wrong url is entered', () => {
  const history = createMemoryHistory();
  
  render(
    <Router history={history}>
      <QuestionsView
        url="httpss://opentdb.com/api.php?amount=10&category=1&difficulty=1&type=multiple"
      />
    </Router>
  );
  
});


test('should display timesup screen', (done) => {
  const history = createMemoryHistory();
  
  render(
    <Router history={history}>
      <QuestionsView />
    </Router>
  );

  setTimeout(() => done(), 15000)
}, 20000);
