import React, { useState, useContext, useCallback, useEffect } from 'react';
import classes from './Dashboard.module.css';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../../UI/Modal/Modal';
import { Link, useHistory } from 'react-router-dom';

const Dashboard = () => {
    const { request } = useHttp();
    const auth = useContext(AuthContext);

    const [modal, setModal] = useState(false);
    const [list, setList] = useState([]);
    const [listTitle, setListTitle] = useState('');

    const history = useHistory();

    const showModal = () => {
        setModal(!modal);
    }

    const createList = async () => {
        try {
            await request(
                '/api/list/create', 
                'POST', 
                {title: listTitle}, 
                {Authorization: `Bearer ${auth.token}`}
            );
        } catch (err) {}

        setModal(!modal);
    }

    const getLists = useCallback( async () => {
        try {
            const data = await request(
                '/api/list/lists', 
                'GET', 
                null, 
                {Authorization: `Bearer ${auth.token}`}
            );
            setList(data);
        } catch (err) {}
    }, [request, auth.token]);

    useEffect(() => {
        getLists();
    }, [getLists, list]);

    const deleteList = async id => {
        try {
            await request(
                '/api/list/delete', 
                'POST', { id: id }, 
                {Authorization: `Bearer ${auth.token}`}
            );
            await request(
                '/api/tasks/deleteall', 
                'POST', { id: id }, 
                {Authorization: `Bearer ${auth.token}`}
            );
            history.push('/dashboard');
        } catch (err) {}
    }

    const showList = id => {
        history.push(`/dashboard/${id}`);
    }

    return (
        <>
            <div className={classes.dashboard}>
                <div onClick={showModal}>+</div>
                {
                    !list.length
                    ? (
                        <div className={classes.create}><i className="fas fa-arrow-left"></i>&nbsp;Создайте первую группу задач :)</div>
                    )
                    : null
                }
                {
                    list.map((item, index) => {
                        return (
                            <div key={index} onClick={() => showList(item._id)}>
                                    <p>{item.title}</p>
                                <button 
                                    className={classes.delete}
                                    onClick={() => deleteList(item._id)}
                                >Удалить</button>
                            </div>
                        )
                    })
                }
            </div>

            { modal ? <Modal setListTitle={setListTitle} createList={createList} showModal={showModal} /> : null }
        </>
    )
}

export default Dashboard;