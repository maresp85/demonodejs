const mongoose = require('mongoose')
const Schema = mongoose.Schema;


let estadosValidos = {
    values: ['ASIGNADA', 'EN PROCESO', 'SOLUCIONADA', 'RECHAZADA'],
    message: "{VALUE} no es un estado válido"
}

let ordenesSchema = new Schema({
    descripcion: { type: String, required: [true, 'La Descripción es obligatoria'] },
    obra: { type: String, required: [true, 'La Obra es obligatoria'] }, 
    fecha: { type: Date, required: [true, 'La Fecha es obligatoria'] },
    estado: { type: String, default: 'ASIGNADA', enum: estadosValidos },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    obra: { type: Schema.Types.ObjectId, ref: 'Obra' }
});


module.exports = mongoose.model('Ordenes', ordenesSchema);