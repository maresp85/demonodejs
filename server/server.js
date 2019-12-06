require ('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

//cors
app.use(cors());

//serve static content
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/uploadsobras', express.static(__dirname + '/uploadsobras'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//configuración global de rutas
app.use( require('./routes/index') );

mongoose.connect('mongodb+srv://admin:Vy7O2w9FCSKO6TEa@cluster0-hjxkh.mongodb.net/ordenes?retryWrites=true&w=majority', (err, res) => {
    if ( err ) throw err;
    console.log("base de datos online");
});

app.listen(process.env.PORT, () => {
    console.log('puerto 3000');
})