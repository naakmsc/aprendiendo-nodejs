const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required: true
    },
    descripcion: {
        type:String,
        required: true
    },
    estado:{
        type: Boolean,
        default:true
    },
    alumnos: {
        type:Number,
        default:0
    },
    califica : {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Curso",cursoSchema);