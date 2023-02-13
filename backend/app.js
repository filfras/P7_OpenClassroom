const cors = require('cors');
const express = require('express');
require('dotenv/config');

const userRoutes = require('./routes/user')

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', userRoutes)

module.exports = app;
