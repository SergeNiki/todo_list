import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Admin from './pages/Admin/Admin';
import MainTodo from './pages/MainTodo/TodoMain';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import Login from './pages/Login/Login';

const App = observer(() => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { authUserStore } = useContext(Context);
  useEffect(() => {
    isInitializeApp();
  }, []);

  const isInitializeApp = async () => {
    if (localStorage.getItem('token')) {
      await authUserStore.authMe();
    }
    setIsInitialized(true);
  };

  if (!isInitialized) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='*' element={<Navigate to={'/todo'} />} />
          <Route path='/todo' element={<MainTodo />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});

export default App;
