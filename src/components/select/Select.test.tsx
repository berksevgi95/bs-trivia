import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from './Select';

describe('Select', () => {
  // it('renders without crashing', () => {
  //   shallow(<Select />);
  // });
  
  it('fires onClick event', () => {
    const wrapper = mount(
        <Select
            onClick={() => {}}
            value="a"
            options={[{
                label: 'A',
                value: 'a'
            },{
                label: 'B',
                value: 'b'
            }]}
        />
    );

    wrapper.find('.bs.bs-select').hostNodes().first().simulate('click')
  })
})
