const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const registerRouter = Router();

registerRouter.post(
    '/register',
    [
        check('email', 'Некорректный Е-Мэйл!').isEmail(),
        check('password', 'Некорректный пароль! Минимальная длина 6 символов.').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации! Повторите попытку.'
            });
            const { email, password } = req.body;

            const person = await User.findOne({ email });
            if (person) return res.status(400).json({ message: 'Такой пользователь уже существует..!' });

            const hashedPass = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPass });

            await user.save();

            res.status(201).json({ message: 'Пользователь создан!' })
            
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так..((' });
        }
    }
);

module.exports = registerRouter;