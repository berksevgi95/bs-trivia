import React from 'react';
import {
  render, fireEvent, getByText,
} from '@testing-library/react';
import ResultView, { IResultState } from './ResultView';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

test('renders and matches its snapshots without any crash', () => {
  const history = createMemoryHistory();
  
  const wrapper = render(
    <Router history={history}>
      <ResultView />
    </Router>
  );
  expect(wrapper).toMatchSnapshot();
});

test('fires click event', () => {
  const history = createMemoryHistory();
  const state: IResultState = {
    correctCount : 1,
    points: 1,
    questionCount: 1
  }
  history.push('/', state)
  
  const {container} = render(
    <Router history={history}>
      <ResultView />
    </Router>
  );
  
  fireEvent.click(
    getByText(container, 'Go to Welcome Page')
  )
});
