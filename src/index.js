import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import AppMain from './Creator.jsx';

import './sass/main.scss';

ReactDOM.render(
    <StrictMode>
      <AppMain />
    </StrictMode>
    ,
    document.getElementById('root')
);
