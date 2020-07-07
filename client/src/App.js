import React from 'react';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes/routes';
import { BrowserRouter, Link } from 'react-router-dom';
import Header from './components/Header/Header';


import './App.css';
import 'materialize-css';


function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{ token, login, logout, userId }}>
      <BrowserRouter>
        {
          isAuth
            ? <Header>
                    <Link to="/dashboard">Мои задачи</Link>
                    <Link to="/" onClick={logout} >Выход</Link>
              </Header>
            : <Header>
                <Link to="/">Главная</Link>
                <Link to="/login">Авторизация</Link>
                <Link to="/register">Регистрация</Link>
              </Header>
        }
        <div className="layout">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )  
}

export default App;
