import React, { useState } from 'react';
import axios from 'axios';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

import { Alert, Button, Field } from './components';

function App() {
  const [credential, setCredential] = useState({ email: '', password: '' });
  const [credentialError, setCredentialError] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setCredential((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    const email = /\S+@\S+\.\S+/.test(credential.email)
      ? ''
      : 'Format email salahh';
    const password =
      credential.password.length < 8 ? 'Minimal password 8 karakter' : '';
    setCredentialError((current) => ({ ...current, email, password }));
    return email || password;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      return false;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://reqres.in/api/login',
        credential
      );

      setToken(response.data.token);
    } catch (error) {
      const message = error.response?.data?.error;
      setError(message || 'Something weird happened');
    }

    setIsLoading(false);
  }

  return (
    <div className="p-24 text-center">
      <h1 className="text-4xl mb-5 font-bold font-serif">
        Monggo login rumiyin
      </h1>
      {token && <Alert icon={FaCheckCircle}>Login Success</Alert>}
      {error && (
        <Alert color="red" icon={FaExclamationTriangle}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          placeholder="masukkan email"
          onChange={handleChange}
          label="Email"
          value={credential.email}
          error={credentialError.email}
        />
        <Field
          name="password"
          placeholder="masukkan password"
          type="password"
          onChange={handleChange}
          label="Password"
          value={credential.password}
          error={credentialError.password}
        />
        <Button type="submit" disabled={isLoading} block>
          Soebmit
        </Button>
      </form>
    </div>
  );
}

export default App;
