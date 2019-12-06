var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var noConformidadSchema = new Schema({
    fecha: { type: Date, required: false },
    observaciones: { type: String, required: true, default: true },
    ordenes: { type: Schema.Types.ObjectId, ref: 'Ordenes', required: true },   
});


module.exports = mongoose.model('NoConformidad', noConformidadSchema);