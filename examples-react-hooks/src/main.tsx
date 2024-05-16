import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import { UserProvider } from './providers/UserProvider';

function Main() {
  return (
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
