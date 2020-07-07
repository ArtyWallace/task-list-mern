const { Router } = require('express');
const List = require('../models/List');
const auth = require('../middleware/auth.middleware');
// const User = require('../models/User');

const listRouter = Router();

listRouter.post('/create', auth, async (req, res) => {
    try {
        const { title } = req.body;
        // const person = User.find({ _id: req.user.userId });
        const list = new List({
            title: title, 
            owner: req.user.userId
        });

        // await person.update({$push: {"lists" : list}});

        await list.save();
        res.status(201).json({ list });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

listRouter.get('/lists', auth, async (req, res) => {
    try {
        const lists = await List.find({ owner: req.user.userId });
        res.json(lists);
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

listRouter.post('/delete', auth, async (req, res) => {
    try {
        const { id } = req.body;

        const list = await List.findOneAndDelete({ _id: id });
        res.status(200).json({ list });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

module.exports = listRouter;