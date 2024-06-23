// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { HashRouter } from "react-router-dom";
// import { createRoot } from 'react-dom/client';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <HashRouter>
//     <App />
//   </HashRouter>
// );
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);
// reportWebVitals();



import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);




