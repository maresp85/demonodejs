const express = require('express');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const path = require('path');
const _ = require('underscore');

let app = express();
app.use(fileUpload());

let DatosOrdenes = require('../models/datosordenes');
let Ordenes = require('../models/ordenes');


// =======================================
// Consultar datos de una orden de trabajo
// =======================================
app.get('/datosordenes/:ordenesid', function (req, res) {
       
    let ordenesid = req.params.ordenesid;

    DatosOrdenes.find({'ordenes':ordenesid}, 'actividad descripcion observaciones img fecha num')    
           .exec( (err, datosordenesDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    datosordenesDB
                });
                
           });

});

// =======================================================
// Consultar datos de una orden de trabajo (num)
// ======================================================
app.get('/datosordenes/:ordenesid/:num', function (req, res) {
       
    let ordenesid = req.params.ordenesid;
    let num = req.params.num;

    DatosOrdenes.find({'ordenes': ordenesid,'num': num}, 'actividad descripcion observaciones img fecha num')    
           .exec( (err, datosordenesDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    datosordenesDB
                });
                
           });

});


// =====================================
// Crear datos de una orden de trabajo
// =====================================
app.post('/datosordenes', (req, res) => {
   
    let body = req.body;

    var nombreArchivo = cargarImagen(req);

    let datosordenes = new DatosOrdenes({
        actividad: body.actividad,
        descripcion: body.descripcion,
        fecha: body.fecha,
        observaciones: body.observaciones,
        ordenes: body.ordenes,
        img: nombreArchivo,
        num: body.num,
    });

    datosordenes.save((err, datosordenesDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!datosordenesDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //se actualiza el estado de la orden
        let id2 = body.ordenes;
        let body2 = _.pick(req.body, ['estado']);
    
        Ordenes.findByIdAndUpdate(id2, body2, { new: true, runValidators: true }, (err, ordenesDB) => {});

        res.json({
            ok: true,
            ordenes: datosordenesDB
        });

    });
});

var cargarImagen = function (req) {

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

    archivo.mv(`server/uploads/${ nombreArchivo }`, (err) => {

        if (err) {
            return "";
        }
      
    });

    return nombreArchivo;
    
}

module.exports = app;