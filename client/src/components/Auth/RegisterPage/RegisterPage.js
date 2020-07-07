import React from 'react';
import Form from '../../../UI/Form/Form';
import Button from '../../../UI/Button/Button';

import classes from './RegisterPage.module.css';
import { Link } from 'react-router-dom';

const RegisterPage = ({ changeHandler, registerHandler, error }) => {
    return (
        <div className={classes.RegisterPage}>
            <div>
                <Form
                    title="Регистрация"
                    changeHandler={changeHandler}
                    error={error}
                />
                <Button click={registerHandler}>Зарегистрироваться</Button>
                <Link to="/login"><Button>К авторизации</Button></Link>
            </div>
        </div>
    )
}

export default RegisterPage;