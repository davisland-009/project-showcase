import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import styles from './NavBar.module.css';

export default function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <div className={styles.spacer}></div>
      {user !== null ? 
      (<NavLink className={styles.login} to="/logout">Logout</NavLink>) 
      : (<NavLink className={styles.login} to="/login">Login</NavLink>)}
    </nav>
  );
}
