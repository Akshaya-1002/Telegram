import React from 'react';
import { createRoot } from 'react-dom/client';
// A "provider" in React Redux enables components to access the Redux store easily without manual prop-passing.
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);