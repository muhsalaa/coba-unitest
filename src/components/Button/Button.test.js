import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { FaExclamationTriangle } from 'react-icons/fa';

import { Button } from './index';
import { findByTestAttr } from '../../helpers/test';

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

    it('Renders icon if provided', () => {
      const wrapper = shallow(
        <Button icon={FaExclamationTriangle}>Hola</Button>
      );

      expect(wrapper.text()).toContain('<FaExclamationTriangle />');
    });
  });

  describe('Component Functionality', () => {
    it('should handle click event', () => {
      const spy = jest.fn();
      const wrapper = mount(<Button onClick={() => spy('haha')} />);

      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');

      expect(spy).toHaveBeenCalledTimes(4);
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
      const wrapper = (props) => mount(<Button {...props} />);
      const button = findByTestAttr(wrapper({}), 'qa-button');

      expect(button.props().className).toContain('bg-blue-600');
    });

    it('should render button with color props provided', () => {
      const wrapper = mount(<Button color="red" />);
      const button = findByTestAttr(wrapper, 'qa-button');

      expect(button.props().className).toContain('bg-red-600');
    });

    it('should render button with gray color when disabled', () => {
      const wrapper = mount(<Button disabled />);
      const button = findByTestAttr(wrapper, 'qa-button');

      expect(button.props().className).toContain('bg-gray-500');
    });

    it('should have full width if block props provided', () => {
      const wrapper = mount(<Button block />);
      const button = findByTestAttr(wrapper, 'qa-button');

      expect(button.props().className).toContain('w-full');
    });
  });
});
