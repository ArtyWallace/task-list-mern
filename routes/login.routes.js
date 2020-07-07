const { Router } = require('express');
const config = require('config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const loginRouter = Router();

loginRouter.post(
    '/login',
    [
        check('email', 'Введите корректный Е-Мэйл!').normalizeEmail().isEmail(),
        check('password', 'Введите корректный пароль!').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при авторизации! Повторите попытку.'
            });
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Пользователь не найден! Попробуйте снова.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Неверный пароль! Попробуйте снова.' });

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '2h' }
            );
            
            res.json({ token, userId: user.id });
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так..((' });
        }
    }
);

module.exports = loginRouter;