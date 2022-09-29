require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const taskRouter = require('./routes/task-router');
const authRouter = require('./routes/auth-router');
const usersRouter = require('./routes/users-router');

const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', taskRouter);
app.use('/api', usersRouter);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
