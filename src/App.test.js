import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';

import App from './App';
import { findByTestAttr } from './helpers/test';

describe('App page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  afterEach(() => {});

  describe('Component Renders', () => {
    it('Renders correctly and match snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Page functionality', () => {
    it('Email input field change values', () => {
      // explain berbagai cara tuhan menghadirkan cinta
      // const emailInput = findByTestAttr(wrapper, 'qa-input-field').at(0);
      const emailInput = () =>
        findByTestAttr(wrapper, 'qa-input-field').first();
      // const emailInput = wrapper.find({ name: 'email' });
      // const emailInput = findByTestAttr(
      //   wrapper,
      //   'qa-input-field',
      //   'input'
      // ).first();

      emailInput().simulate('change', {
        target: { name: 'email', value: 'Hola como estas' },
      });
      wrapper.update();

      expect(emailInput().props().value).toBe('Hola como estas');
    });

    it('Password input field change values', async () => {
      const passwordInput = () =>
        findByTestAttr(wrapper, 'qa-input-field').at(1);

      // passwordInput().simulate('change', {
      //   target: { name: 'password', value: 'monoyoyoy' },
      // });
      act(() => {
        passwordInput()
          .props()
          .onChange({
            target: { name: 'password', value: 'monoyoyoy' },
          });
      });

      wrapper.update();

      expect(passwordInput().props().value).toBe('monoyoyoy');
    });
  });
});
