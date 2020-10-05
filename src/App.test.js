import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

import App from './App';
import { findByTestAttr } from './helpers/test';

describe('App page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Renders', () => {
    it('Renders correctly and match snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Email input', () => {
    it('Input field changed its values', () => {
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

    it('shows error if email format false', () => {
      const form = wrapper.find('form');
      const emailInput = () =>
        findByTestAttr(wrapper, 'qa-input-field').first();

      emailInput().simulate('change', {
        target: { name: 'email', value: 'Hola como estas' },
      });
      form.simulate('submit');
      wrapper.update();

      expect(findByTestAttr(wrapper, 'qa-input-error').first().text()).toBe(
        'Format email salahh'
      );
    });
  });

  describe('Password input', () => {
    it('input field changed its values', async () => {
      const passwordInput = () =>
        findByTestAttr(wrapper, 'qa-input-field').at(1);

      // passwordInput().simulate('change', {
      //   target: { name: 'password', value: 'monoyoyoy' },
      // });
      // explain if use onChange we should use act
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

    it('shows error if password length less than 8', () => {
      const form = wrapper.find('form');
      const passwordInput = () =>
        findByTestAttr(wrapper, 'qa-input-field').last();

      passwordInput().simulate('change', {
        target: { name: 'password', value: 'Hol' },
      });
      form.simulate('submit');
      wrapper.update();

      expect(findByTestAttr(wrapper, 'qa-input-error').last().text()).toBe(
        'Minimal password 8 karakter'
      );
    });
  });

  describe('Page functionality', () => {
    async function filler(email, password) {
      const form = wrapper.find('form');
      const passwordInput = findByTestAttr(wrapper, 'qa-input-field').last();
      const emailInput = findByTestAttr(wrapper, 'qa-input-field').first();

      passwordInput.simulate('change', {
        target: { name: 'password', value: password },
      });

      emailInput.simulate('change', {
        target: { name: 'email', value: email },
      });

      await act(async () => {
        await form.simulate('submit');
      });

      wrapper.update();
    }

    it('Button should disabled when submit', async () => {
      await filler('moz@email.com', 'hahahaha');
      const submitButton = findByTestAttr(wrapper, 'qa-button');

      expect(submitButton.props().disabled).toBe(true);
    });

    // https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
    it('Get response data when fail and show alert', async () => {
      expect.assertions(2);

      jest
        .spyOn(axios, 'post')
        .mockImplementationOnce(() =>
          Promise.reject({ response: { data: { error: 'Terjadi kesalahan' } } })
        );

      await filler('moz@email.com', 'hahahaha');
      const alert = findByTestAttr(wrapper, 'qa-alert');

      expect(alert.exists()).toBe(true);
      expect(alert.text()).toBe('Terjadi kesalahan');
    });

    it('Get response data when success and show alert', async () => {
      expect.assertions(2);

      jest
        .spyOn(axios, 'post')
        .mockImplementationOnce(() =>
          Promise.resolve({ data: { token: 'aSimpleAndCuteToken' } })
        );

      await filler('moz@email.com', 'hahahaha');
      const alert = findByTestAttr(wrapper, 'qa-alert');

      expect(alert.exists()).toBe(true);
      expect(alert.text()).toBe('Login Success');
    });
  });
});
