const mongoose = require('mongoose');
const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');

const switches = require('./routes/switches');
const users = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost/switchBase', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/switches', switches);
app.use('/api/users', users);

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));