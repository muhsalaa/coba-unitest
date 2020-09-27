import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { FaExclamationTriangle } from 'react-icons/fa';

import Alert from './index';

describe('Alert component', () => {
  describe('Component Renders', () => {
    // tulis ini semua dulu baru masukkin ke describe lg
    it('Renders correctly and match snapshot', () => {
      const wrapper = mount(<Alert />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Renders text (children) provided', () => {
      const wrapper = shallow(<Alert>Hola como estas</Alert>);

      // jelaskan macam2 matchers
      expect(wrapper.text()).toBe('Hola como estas');
    });

    it('Renders icon if provided', () => {
      const wrapper = shallow(<Alert icon={FaExclamationTriangle}>Hola</Alert>);

      expect(wrapper.text()).toContain('<FaExclamationTriangle />');
      expect(wrapper.text()).toBe('<FaExclamationTriangle />Hola');
      expect(wrapper.text()).toEqual('<FaExclamationTriangle />Hola');
      expect(wrapper.text()).toMatch(/<FaExclamationTriangle \/>Hola/);
    });
  });

  describe('Component style', () => {
    it('Should have green color by default', () => {
      const wrapper = mount(<Alert />);
      const alert = wrapper.find('div[data-testid="qa-alert"]');

      expect(alert.props().className).toContain('bg-green-200');
    });

    it('Should have red color if props provided', () => {
      const wrapper = mount(<Alert color="red" />);
      const alert = wrapper.find('div[data-testid="qa-alert"]');

      expect(alert.props().className).toContain('bg-red-200');
    });
  });
});
