const express = require('express');
let app = express();
let Ordenes = require('../models/ordenes');

// =============================
// Consultar todas las ordenes
// =============================
app.get('/ordenes', (req, res) => {

    Ordenes.find({})
           .populate({path:'usuario'})
           .populate({path:'obra'})
           .exec( (err, ordenesDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    ordenesDB
                });
                        
    });

});

// =============================
// Crear Orden de trabajo
// =============================
app.post('/ordenes', (req, res) => {
   
    let body = req.body;

    let ordenes = new Ordenes({
        descripcion: body.descripcion,
        obra: body.obra,
        ubicacion: body.ubicacion,
        fecha: new Date(),
        estado: 'ASIGNADA',
        usuario: body.usuario
    });


    ordenes.save((err, ordenesDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ordenesDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ordenes: ordenesDB
        });

    });
});


// ================================
// Consultar ordenes por usuario y obra
// ================================
app.get('/ordenes/:usuarioid', (req, res) => {

    let usuarioid = req.params.usuarioid;

    Ordenes.find({'usuario':usuarioid})
           .populate({path:'usuario'})
           .populate({path:'obra'})
           .exec( (err, ordenesDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    ordenesDB
                });
                        
    });

});

// ================================
// Consultar ordenes por usuario 
// ================================
app.get('/ordenes/:usuarioid/:obraid', (req, res) => {

    let usuarioid = req.params.usuarioid;
    let obraid = req.params.obraid;

    Ordenes.find({'obra': obraid,'usuario': usuarioid})
           .populate({path:'usuario'})
           .populate({path:'obra'})
           .exec( (err, ordenesDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    ordenesDB
                });
                        
    });

});


module.exports = app;