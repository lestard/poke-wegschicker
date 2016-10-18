import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(function(ex) {
        console.warn(ex);
        console.warn('(This warning can be safely ignored outside of the production build.)');
    });
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
