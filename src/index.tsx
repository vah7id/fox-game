import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import GameContainer from './screens/game/components/GameContainer';
import reportWebVitals from './reportWebVitals';
import { GameProvider } from './context/GameContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './screens/welcome/components/Navbar';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <Navbar />
        <GameContainer />
      </GameProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
