import React from 'react';
import {
  render,
  fireEvent,
  getByTitle,
  getByText
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


test('should press options menu change difficulty and catergory', () => {
  const history = createMemoryHistory();
  
  const {container} = render(
    <Router history={history}>
      <QuestionsView />
    </Router>
  );

  fireEvent.click(
    getByTitle(container, 'Options')
  )

  fireEvent.click(
    getByText(container, 'Easy')
  )

  fireEvent.click(
    getByText(container, 'Medium')
  )

  fireEvent.click(
    getByText(container, 'Art')
  )

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
