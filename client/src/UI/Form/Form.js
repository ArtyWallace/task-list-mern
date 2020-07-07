import React from 'react';
import classes from './Form.module.css';
import { useHttp } from '../../hooks/http.hook';

const Form = props => {

    return (
        <form className={classes.Form}>
            <fieldset>
                <legend>{props.title}</legend>
                <input className={classes.input} name="email" type="email" placeholder="Логин" required onChange={props.changeHandler} />
                <input className={classes.input} name="password" type="password" placeholder="Пароль (6 символов)" required onChange={props.changeHandler} />
            </fieldset>
            {
                props.error
                ? (
                    <div className={classes.error}>{props.error}</div>
                )
                : null
            }
        </form>
    )
}

export default Form;