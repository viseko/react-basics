import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../Components/UI/loader/Loader';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router/routes';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth
      ?
        <Routes>
          {
            privateRoutes.map(route => 
              <Route
                path={route.path}
                element={route.component}
                key={route.path}
              />
            )
          }
        </Routes>
      :
        <Routes>
          {
            publicRoutes.map(route => 
              <Route
                path={route.path}
                element={route.component}
                key={route.path}
              />
            )
          }
        </Routes>
  );
};

export default AppRouter