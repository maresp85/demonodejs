const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.post('/upload', function(req, res) {
 
    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }
 
    let archivo = req.files.photo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }
 
    let nombreArchivo = `${ new Date().getMilliseconds()  }.${ extension }`;

    archivo.mv(`uploads/${ nombreArchivo }`, (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.status(200)
            .json({
                ok: true,
                err: {
                    message: 'Imagen Cargada'
                }
            });
      
    });

});


module.exports = app;