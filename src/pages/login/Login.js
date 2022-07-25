import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

export default function Login({ history }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const { email, password } = login;

  const checkLogin = () => {
    const testEmail = /\S+@\S+\.\S+/;
    const numberMin = 6;
    const result = !((testEmail.test(email) && password.length > numberMin));

    return result;
  };

  const onLoginBtnClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  const handleChange = ({ target: { name, value } }) => {
    setLogin((old) => ({ ...old, [name]: value }));
  };

  return (
    <form className="login-page">
      <div className="login-page-inner-container">
        <h1 className="site-title">CookACookie</h1>
        <div className="login-input-container">
          <label htmlFor="emailLogin" className="login-input-label">
            <input
              id="emailLogin"
              type="email"
              name="email"
              placeholder="E-mail"
              className="login-input"
              value={ email }
              data-testid="email-input"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="passwordLogin" className="login-input-label">
            <input
              id="passwordLogin"
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              value={ password }
              data-testid="password-input"
              onChange={ handleChange }
            />
          </label>
        </div>
        <button
          className="login-button"
          type="button"
          data-testid="login-submit-btn"
          onClick={ onLoginBtnClick }
          disabled={ checkLogin() }
        >
          Cook!
        </button>
      </div>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape(
    PropTypes.func.isRequired,
  ).isRequired,
};
