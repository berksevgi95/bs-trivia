import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('renders and matches its snapshots without any crash', () => {
  const wrapper = render(
    <Button/>
  );
  expect(wrapper).toMatchSnapshot();
});