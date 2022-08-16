const express = require('express');
const cors = require('cors');
require('./configs/dotenv');
const app = express();
const port = process.env.PORT || 4000;
const client = require('./configs/database');
const user = require('./routes/users');
const bodyParser = require('body-parser');

const myLogger = (req, res, next) => {
  const log = {
    date: new Date(),
    url: req.url
  };
  console.log(JSON.stringify(log, null, 2));
  next();
};

//app.use(bodyParser.json());

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data logging initiated!');
  }
});

app.use(bodyParser.json());
app.use(myLogger);
app.use('/users', user);
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Engine Started, Ready to take off!');
});

app.listen(port, () => {
  console.log(`Here we go, Engines started at ${port}.`);
});
