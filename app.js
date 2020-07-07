const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const registerRouter = require('./routes/register.routes')
const loginRouter = require('./routes/login.routes');
const taskRouter = require('./routes/tasks.routes');
const listRouter = require('./routes/lists.routes');

const app = express();
app.use(express.json({ extended: true }));
app.use('/api/auth', registerRouter);
app.use('/api/auth', loginRouter);
app.use('/api/list', listRouter);
app.use('/api/tasks', taskRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI || config.get('mongoUri'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );

        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}..`));
    } catch (error) {
        console.log('Error', error.message);
        process.exit(1);
    }
}

start();

