import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import './AuthPages.css';

const Login = () => {
  return (
    <div className="auth-page">
      <LoginForm />
      <p className="auth-switch">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
