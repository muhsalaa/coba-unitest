import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Button } from './index';

describe('Button component', () => {
  describe('Component Renders', () => {
    it('Renders correctly and match snapshot', () => {
      const wrapper = mount(<Button />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Renders text (children) provided', () => {
      const wrapper = shallow(<Button>Hola como estas</Button>);

      expect(wrapper.text()).toBe('Hola como estas');
    });
  });

  describe('Component Functionality', () => {
    it('should handle click event', () => {
      const spy = jest.fn();
      const wrapper = mount(<Button onClick={() => spy('haha')} />);

      wrapper.simulate('click');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('haha');
    });

    it('should not clicked when disabled', () => {
      const spy = jest.fn();
      const wrapper = mount(<Button onClick={() => spy('haha')} disabled />);

      wrapper.simulate('click');

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('Component style', () => {
    it('should render blue button by default', () => {
      const wrapper = mount(<Button />);

      expect(wrapper.props().className).toContain('bg-blue-600');
    });
  });
});
