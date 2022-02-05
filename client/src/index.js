import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import ScrollToTop from './ScrollToTop';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop>
        <App></App>
      </ScrollToTop>
    </HashRouter>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
