import { useState } from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import HostPage from './pages/HostPage';
import JoinPage from './pages/JoinPage';
import GamePage from './pages/GamePage';

function App() {
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });

  const showSnack = (message, severity = 'info') => {
    setSnack({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  const GamePageWrapper = () => {
    const location = useLocation();
    return location.state ? <GamePage /> : <Navigate to="/" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/host" element={<HostPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/game/:gameCode" element={<GamePageWrapper />} />
        </Routes>
      </BrowserRouter>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
