import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import MainPage from '../components/MainPage/MainPage';
import Auth from '../components/Auth/Auth';
import TaskList from '../components/TaskList/TaskList';

export const useRoutes = isAuth => {

    if (isAuth) {
        return (
            <Switch>
                <Route path="/dashboard" exact>
                    <Dashboard />
                </Route>
                <Route path="/dashboard/:id">
                    <TaskList />
                </Route>
                <Redirect to="/dashboard" />
            </Switch>
        )
    }
  
    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Auth />
            <Redirect to="/" />
        </Switch>
    )
}