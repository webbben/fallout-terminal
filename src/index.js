import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
// note:  I removed strict mode - not sure if I'd want it back at some point though, but it was causing double rendering

