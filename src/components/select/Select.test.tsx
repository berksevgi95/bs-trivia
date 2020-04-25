import React from 'react';
import {
  render, fireEvent, getByText,
} from '@testing-library/react';
import Select from './Select';

test('renders and matches its snapshots without any crash', () => {
  const wrapper = render(
    <Select 
      onClick={() => {}}
      options={[{
        label: 'A',
        value: 'a',
      },{
        label: 'B',
        value: 'b',
      }]}
      value="a"
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('fires click event', () => {
  const {container} = render(
    <Select 
      onClick={() => {}}
      options={[{
        label: 'A',
        value: 'a',
      },{
        label: 'B',
        value: 'b',
      }]}
      value="a"
    />
  );
  
  fireEvent.click(
    getByText(container, 'A')
  )

  fireEvent.click(
    getByText(container, 'B')
  )

  fireEvent.click(
    document
  )
});
