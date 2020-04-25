import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders and matches its snapshots without any crash', () => {
  const wrapper = render(<App />);
  expect(wrapper).toMatchSnapshot();
});
