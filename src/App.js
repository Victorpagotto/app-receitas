import React from 'react';
import AppProvider from './store';
import Routes from './routes/routes';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
