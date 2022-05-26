import React, { useEffect, useState } from 'react';
import Navbar from './Components/UI/navbar/Navbar';
import AppRouter from './AppRouter/AppRouter';
import { AuthContext } from './context';
import { BrowserRouter } from 'react-router-dom';

import "./Styles/app.css";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("auth")) {
      setIsAuth(true)
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;