const express = require('express'),
    app = express(),
    port = process.env.PORT || 4500,
    bodyParser = require('body-parser'),
    proppinsiController = require('./controllers/propinsiController');
kontrasepsipController = require("./controllers/kontrasepsiController");
pemakaiController = require("./controllers/pemakaiController");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes');
routes(app);

app.listen(port);
console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);
