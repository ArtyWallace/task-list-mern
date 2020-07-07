import React, { useState, useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import AuthPage from './AuthPage/AuthPage';
import RegisterPage from './RegisterPage/RegisterPage';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

const Auth = () => {
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const [form, setForm] = useState({
      email: '',
      password: ''
    });
    const history = useHistory();

    const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
      try {
        const data = await request('/api/auth/register', 'POST', { ...form });
        history.push('/login')
      } catch (err) { }
    }
    
    const loginHandler = async () => {
      try {
        const data = await request('/api/auth/login', 'POST', {...form});
        auth.login(data.token, data.userId);
      } catch (err) {  }
    }

    useEffect(() => {
      setTimeout(() => clearError(), 4000);
    }, [clearError]);

    return (
        <>
            <Route path="/login">
                <AuthPage
                    changeHandler={changeHandler}
                    loginHandler={loginHandler}
                    error={error}
                />
            </Route>
            <Route path="/register">
                <RegisterPage
                    changeHandler={changeHandler}
                    registerHandler={registerHandler}
                    error={error}
                />
            </Route>
        </>
    )
}

export default Auth;