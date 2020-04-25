import React from 'react';
import {
  render, getByText, fireEvent,
} from '@testing-library/react';
import Radiobutton from './Radiobutton';

test('renders and matches its snapshots without any crash', () => {
  const wrapper = render(
    <Radiobutton
      checked
      label="RadioButton"
      onChange={() => { }}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('fires click event', () => {
  const {container} = render(
    <Radiobutton
      checked
      label="RadioButton"
      onChange={() => { }}
    />
  );
  
  fireEvent.click(
    getByText(container, 'RadioButton')
  )
});
