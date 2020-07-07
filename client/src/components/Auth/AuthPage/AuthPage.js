import React from 'react';
import classes from './AuthPage.module.css';
import Form from '../../../UI/Form/Form';
import Button from '../../../UI/Button/Button';
import { Link } from 'react-router-dom';

const AuthPage = ({ changeHandler, loginHandler, error }) => {

    return (
        <div className={classes.AuthPage}>
            <div>
                <Form
                    title="Авторизация"
                    changeHandler={changeHandler}
                    error={error}
                />

                <Button click={loginHandler}>Авторизация</Button>
                <Link to="/register"><Button>К регистрации</Button></Link>
            </div>
        </div>
    )
}

export default AuthPage;