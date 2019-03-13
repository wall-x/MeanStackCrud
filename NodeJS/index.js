const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db.js');
let employeeController = require('./controllers/employeeController.js');

let app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started at port: 3000'));

app.use('/employees', employeeController);
