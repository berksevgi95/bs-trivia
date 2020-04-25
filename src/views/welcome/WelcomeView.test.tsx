import React from 'react';
import {
  render, fireEvent, getByText,
} from '@testing-library/react';
import WelcomeView from './WelcomeView';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

test('renders and matches its snapshots without any crash', () => {
  const history = createMemoryHistory();
  
  const wrapper = render(
    <Router history={history}>
      <WelcomeView />
    </Router>
  );
  expect(wrapper).toMatchSnapshot();
});

test('fires click event', () => {
  const history = createMemoryHistory();
  
  const {container} = render(
    <Router history={history}>
      <WelcomeView />
    </Router>
  );
  
  fireEvent.click(
    getByText(container, 'Get Started')
  )
});
