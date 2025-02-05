import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd-with-locales';
import { BrowserRouter } from 'react-router-dom';
import Store from './app/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = { Store } >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

