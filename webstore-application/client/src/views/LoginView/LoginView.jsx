import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';
import AuthService from '../../services/AuthService';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

import styles from './LoginView.module.css';

export default function LoginView() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      username: username,
      password: password
    };

    AuthService.login(userData)
      .then((response) => {
        // Retrieve the user and token from response
        const user = response.data.user;
        const token = response.data.token;

        // Add user and token to local storage for later retrieval
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Set token to Axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Set auth context
        setUser(user);

        // Redirect to home view
        navigate('/');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message });
        console.log('Login error:', error);
      });
  }

  return (
    <>
      <h1>Please Sign In</h1>

      <div className={styles.notification}>
        <Notification notification={notification} clearNotification={() => setNotification(null)} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.loginForm}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <button type="submit">Sign in</button>
          </div>
        </div>
      </form>
      <hr/>
      Need an account? <Link to="/register">Register!</Link>
    </>
  );
}
