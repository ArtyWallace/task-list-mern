import React, { useState, useContext, useEffect, useCallback } from 'react';
import classes from './TaskList.module.css';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../UI/Button/Button';
import { useParams, useHistory } from 'react-router-dom';

const TaskList = () => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const listId = useParams().id;

    const history = useHistory();

    const changeHandler = event => {
        setTask(event.target.value);
    }

    const createTask = async () => {
        try {
            await request(
                '/api/tasks/create', 
                'POST', 
                {title: task, id: listId}, 
                { Authorization: `Bearer ${auth.token}` });
        } catch (err) {}
    }

    const getTasks = useCallback( async () => {
        try {
            const data = await request(
                `/api/tasks/tasks/${listId}`, 
                'GET', 
                null, 
                { Authorization: `Bearer ${auth.token}` });
            setTaskList(data);
        } catch (err) {}
    }, [auth.token, request])

    useEffect(() => {
        getTasks();
    }, [getTasks, taskList]);

    const deleteTask = async id => {
        try {
            await request(
                '/api/tasks/delete', 
                'POST', 
                {id: id}, 
                { Authorization: `Bearer ${auth.token}` });
        } catch (err) {}
    }

    const toggleCheck = async (id, done) => {
        try {
            await request(
                '/api/tasks/update', 
                'POST', 
                {id: id, done: done}, 
                { Authorization: `Bearer ${auth.token}` });
        } catch (err) {}
    };

    return (
        <>
            <i className={`fas fa-arrow-left ${classes.back}`} onClick={() => history.push('/dashboard')}></i>
            <div className={classes.TaskList}>
                <div className={classes.tasks}>
                    <div className={classes.header}>
                        {
                            taskList.length
                                ? (
                                    <span>Количество задач: {taskList.length}</span>
                                )
                                : (
                                    <span>Задачи отсутствуют</span>
                                )
                        }
                    </div>
                    {
                        taskList.map((task, index) => {
                            return (
                                <div key={index} className={classes.task}>
                                    <div>
                                        <input type="checkbox" id="checkbox"  hidden />
                                        <label 
                                            htmlFor="checkbox" 
                                            className={task.done ? `fa fa-check ${classes.checked}` : `far fa-square ${classes.unchecked}`}
                                            onClick={() => toggleCheck(task._id, task.done)}
                                        ></label>
                                        {
                                            task.done
                                            ? (
                                                <strike>{task.title}</strike>
                                            )
                                            : task.title
                                        }
                                    </div>
                                    <div>
                                        <span><small>{task.date}</small></span>
                                        <i className="fa fa-trash-alt" onClick={() => deleteTask(task._id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.bottom}>
                <input type="text" placeholder="Введите название задачи.." className={classes.input} onChange={changeHandler} />
                <Button click={createTask} >Добавить</Button>
            </div>
        </>
    )
}

export default TaskList;