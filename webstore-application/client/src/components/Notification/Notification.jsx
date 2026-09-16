import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Notification.module.css';
import { useEffect, useState } from 'react';

export default function Notification({ notification, clearNotification }) {
  const [isFadeIn, setIsFadeIn] = useState(true);

  useEffect(() => {if(notification) {setIsFadeIn(true)}}, [notification]);

  if (!notification) {
    return null;
  }

  const handleFadeOutAnimation = () => {
    setIsFadeIn(false);
    setTimeout(() => {clearNotification();}, 750);
  };

  return (
    <div className={`${styles.notifications} 
      animate__animated ${isFadeIn ? 'animate__fadeInDown' : 'animate__fadeOutUp'}`}
    >
      <div role="alert" className={`${styles.alert} ${styles[notification.type]}`}>
        <span className={styles.message}>{notification.message}</span>
        <button className={styles.iconButton} type='button' onClick={handleFadeOutAnimation}>
          <FontAwesomeIcon className={styles.clearNotification} icon="fa-solid fa-xmark" title="Close" />
        </button>
      </div>
    </div>
  );
}
