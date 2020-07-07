import React from 'react';
import classes from './Modal.module.css';

const Modal = ({ setListTitle , createList, showModal }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.inner}>
            <i className={classes.close + ' fa fa-times'} onClick={showModal} />
                <input 
                    type='text' 
                    placeholder='Введите название группы..' 
                    autoFocus
                    className={classes.input}
                    onChange={event => setListTitle(event.target.value)}
                />
                <div 
                className={classes.add}
                onClick={() => createList()}
                >+</div>
            </div>
        </div>
    )
}

export default Modal;