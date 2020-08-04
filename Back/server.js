const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index');
const cors = require('cors')
const app = express();
const port = 3000;

const login = require('./routes/auth/login.js')
const registration = require('./routes/auth/registration.js')

app.use(cors())

app.use(morgan('dev'));
app.use(morgan(':method :url :status : res [content-length] - : response-time'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/login', login)
app.use('/registration', registration)



app.get('/', (req, res) => {
    res.status(200).send('Page du localhost')
})

app.listen(port, console.log(`http://localhost:${port}`));