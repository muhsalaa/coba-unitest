import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from './App';
import { findByTestAttr } from './helpers/test';

describe('Field component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  describe('Component Renders', () => {
    it('Renders correctly and match snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
