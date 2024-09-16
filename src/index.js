import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { extendedApiSlice } from './features/hymns/hymnsSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(extendedApiSlice.endpoints.getHymns.initiate());
root.render(
  <React.StrictMode>
   <Provider store={store}>
      <App />
   </Provider>
  </React.StrictMode>
);
