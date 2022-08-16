const express = require('express');
const cors = require('cors');
//const api = require('./api');
const PORT = process.env.PORT || 4000;
const users = require('./routes/user.js');
const bodyParser = require('body-parser');
const app = express();
const corsOptions = { origin: `http://localhost:${PORT}` };

const myLogger = (req, res, next) => {
  const log = {
    date: new Date(),
    url: req.url
  };
  console.log(JSON.stringify(log, null, 2));
  next();
};

app.use(bodyParser.json());
app.use(myLogger);
app.use(express.json());
app.use(cors(corsOptions));


app.post('/sign-up', users.postSignUp);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
