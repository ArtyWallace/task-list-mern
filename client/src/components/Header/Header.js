import React from 'react';
import classes from './Header.module.css';

const Header = props => {
    return (
        <header className={classes.Header}>
            <nav className={classes.Nav}>
                {props.children}
            </nav>
        </header>
    )
}

export default Header;