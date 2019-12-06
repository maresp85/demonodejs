var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var datosOrdenesSchema = new Schema({
    actividad: { type: String, required: [true, 'La actividad es requerida'] },
    descripcion: { type: String, required: [true, 'La descripción es requerida'] },
    fecha: { type: Date, required: false },
    observaciones: { type: String, required: true, default: true },
    num: { type: Number, required: true, default: true },
    ordenes: { type: Schema.Types.ObjectId, ref: 'Ordenes', required: true },
    img: { type: String, required: false },
});


module.exports = mongoose.model('DatosOrdenes', datosOrdenesSchema);