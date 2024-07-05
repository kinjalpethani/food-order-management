const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const database = require('./util/database');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(routes);

database.sync().then(() => {
    app.listen(8000);
}).catch(err => console.log(err));

