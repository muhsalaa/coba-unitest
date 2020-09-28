import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

import { Field } from './index';
import { findByTestAttr } from '../../helpers/test';

describe('Field component', () => {
  describe('Component Renders', () => {
    it('Renders correctly and match snapshot', () => {
      const wrapper = mount(<Field />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Renders error message if provided', () => {
      const wrapper = shallow(<Field error="salah bos" />);
      const error = findByTestAttr(wrapper, 'qa-input-error');

      expect(error.text()).toBe('salah bos');
    });

    it('Renders label if provided', () => {
      const wrapper = shallow(<Field label="Masukkan" />);
      const label = findByTestAttr(wrapper, 'qa-input-label');

      expect(label.text()).toBe('Masukkan');
    });
  });

  describe('Component Functionality', () => {
    it('should have value typed', async () => {
      const wrapper = render(<Field />);
      const input = wrapper.getByTestId('qa-input-field');

      await userEvent.type(input, 'hola como estas');

      expect(input.value).toBe('hola como estas');
    });

    it('should not response value typed if readOnly', async () => {
      const wrapper = render(<Field readOnly />);
      const input = wrapper.getByTestId('qa-input-field');

      await userEvent.type(input, 'hola como estas');

      expect(input.value).toBe('');
    });

    it('should not response value typed if disabled', async () => {
      const wrapper = render(<Field disabled />);
      const input = wrapper.getByTestId('qa-input-field');

      await userEvent.type(input, 'hola como estas');

      expect(input.value).toBe('');
    });
  });

  describe('Component style', () => {
    it('should render grey background if readOnly', () => {
      const wrapper = mount(<Field readOnly />);
      const field = findByTestAttr(wrapper, 'qa-input-field');

      expect(field.props().className).toContain('bg-gray-100');
    });

    it('should render red border if error', () => {
      const wrapper = mount(<Field error={{ message: 'salah' }} />);
      const field = findByTestAttr(wrapper, 'qa-input-field');

      expect(field.props().className).toContain('border-red-700');
    });
  });
});
