import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import PersistentDrawerLeft from './PersistentDrawerLeft';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <CssBaseline>
    <PersistentDrawerLeft />
  </CssBaseline>
  //</React.StrictMode>
);


