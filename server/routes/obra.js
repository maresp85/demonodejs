const express = require('express');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const path = require('path');
const _ = require('underscore');

let app = express();
app.use(fileUpload());

let Obra = require('../models/obra');

// =============================
// Consultar todas las Obras
// =============================
app.get('/obra', (req, res) => {

    Obra.find({})           
           .exec( (err, obrasDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    obrasDB
                });
                        
    });

});


// =====================================
// Crear una Obra
// =====================================
app.post('/obra', (req, res) => {
   
    let body = req.body;

    var nombreArchivo = cargarImagenObra(req);

    let obra = new Obra({
        descripcion: body.descripcion,
        ubicacion: body.ubicacion,
        img: nombreArchivo
    });

    obra.save((err, obrasDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!obrasDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            obras: obrasDB
        });

    });
});

var cargarImagenObra = function (req) {

    if (!req.files) {
        return "";
    }
 
    let archivo = req.files.photo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return "";
    }
 
    let nombreArchivo = `${ nombreCortado[nombreCortado.length - 2] }${ new Date().getMilliseconds() }.${ extension }`;

    archivo.mv(`server/uploadsobras/${ nombreArchivo }`, (err) => {

        if (err) {
            return "";
        }
      
    });

    return nombreArchivo;
    
}



module.exports = app;