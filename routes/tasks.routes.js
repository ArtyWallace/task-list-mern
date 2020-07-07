const { Router } = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth.middleware');

const taskRouter = Router();

taskRouter.post('/create', auth, async (req, res) => {
    try {
        const { title, id } = req.body;
        const task = new Task({
            title, 
            list: id,
        });

        await task.save();
        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..((' });
    }
});

taskRouter.get('/tasks/:id', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ list: req.params.id })
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..((' });
    }
});

taskRouter.post('/update', auth, async (req, res) => {
    try {
        const { id, done } = req.body;
        const task = await Task.findOneAndUpdate({_id: id}, { $set: { done: !done } });
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..((' });
    }
});

taskRouter.post('/delete', auth, async (req, res) => {
    try {
        const { id } = req.body;
        const task = await Task.findOneAndDelete({_id: id});
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..((' });
    }
});

taskRouter.post('/deleteall', auth, async (req, res) => {
    try {
        const { id } = req.body;
        const task = await Task.deleteMany({ list: id });
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

module.exports = taskRouter;