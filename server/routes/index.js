const express = require('express');

const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./ordenes'));
app.use(require('./datosordenes'));
app.use(require('./upload'));
app.use(require('./obra'));
app.use(require('./noconformidad'));


module.exports = app;