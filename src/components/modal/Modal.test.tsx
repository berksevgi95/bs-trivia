import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

test('renders and matches its snapshots without any crash', () => {
  const wrapper = render(
    <Modal>
      <div>Example Content</div>
    </Modal>
  );
  expect(wrapper).toMatchSnapshot();
});