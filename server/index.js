require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const taskRouter = require('./routes/task-router');
const authRouter = require('./routes/auth-router');
const usersRouter = require('./routes/users-router');
const roleMiddleware = require('./middleware/roleMiddleware')
const { roles } = require('./data')

const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/task', roleMiddleware([roles.SUBORDINATE, roles.SUPERVISOR]), taskRouter);
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
