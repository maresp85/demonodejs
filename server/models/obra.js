const mongoose = require('mongoose')
const Schema = mongoose.Schema;


let obraSchema = new Schema({
    descripcion: { type: String, required: [true, 'La descripción es obligatoria'] },  
    ubicacion: { type: String, required: [true, 'La ubicación es obligatoria'] },
    img: { type: String, required: false },
});


module.exports = mongoose.model('Obra', obraSchema);