import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import UserProvider from './context/UserProvider.jsx';

import App from './App.jsx';

/* import fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartPlus, faGrip, faMagnifyingGlass, faRotate, faTable, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

// animate.style library
import 'animate.css';

/* add icons to the library */
library.add(faCartPlus);
library.add(faGrip);
library.add(faMagnifyingGlass);
library.add(faRotate);
library.add(faTable);
library.add(faTrashCan);
library.add(faXmark);

/* sets the base url for server API communication with axios */
axios.defaults.baseURL = import.meta.env.VITE_REMOTE_API;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
);
