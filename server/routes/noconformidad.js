const express = require('express');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const path = require('path');
const _ = require('underscore');

let app = express();
app.use(fileUpload());

let NoConformidad = require('../models/noconformidad');


// ===============================================
// Consultar conformidades de una orden de trabajo
// ===============================================
app.get('/noconformidad', function (req, res) {
         
    NoConformidad.find({})    
           .populate({path:'ordenes', populate: {path:'obra'}})
           .exec( (err, noconformidadDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    noconformidadDB
                });
                
           });

});


// ==================================================
// Crear una no conformidad para una orden de trabajo
// ==================================================
app.post('/noconformidad', (req, res) => {
   
    let body = req.body;

    let noconformidad = new NoConformidad({
        fecha: body.fecha,
        observaciones: body.observaciones,
        ordenes: body.ordenes,     
    });

    noconformidad.save((err, noconformidadDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!noconformidadDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ordenes: noconformidadDB
        });

    });
});

module.exports = app;