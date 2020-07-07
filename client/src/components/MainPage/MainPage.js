import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MainPage.module.css';
import logo from '../../img/main-page.jpg';
import Button from '../../UI/Button/Button';

const MainPage = () => {
    return (
        <div className={classes.MainPage}>
            <h1>Создай свой список задач и не пропусти ничего важного!</h1>
            <div className={classes.content}>
                <div>
                    <h3>Список всех дел всегда под рукой!</h3>
                    <div>
                        <Link to="/login">
                            <Button>Авторизация</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Регистрация</Button>
                        </Link>
                    </div>
                </div>
                <img 
                    className={classes.logo}
                    src={logo} 
                    alt="easy task"
                />
            </div>
        </div>
    )
}

export default MainPage;