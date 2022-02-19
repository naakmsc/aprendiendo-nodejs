const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/demo')
    .then(()=>{console.log("Conectado")})
    .catch(()=>{console.log("Error de conexion")});

const cursoSchema = new mongoose.Schema({
    nombre: String,
    autor: String,
    etiquetas: [String],
    fecha: {type:Date, default:Date.now},
    publicado: Boolean
});

const Curso = mongoose.model("Curso",cursoSchema);

async function crearCurso(){
    
    const curso = new Curso({
        nombre:"JavaScript",
        autor: "Grover",
        etiquetas:["Desarrollo web","front end"],
        publicado: true
    });

    const resultado = await curso.save();
    console.log(resultado);
}

// crearCurso()
//     .then(()=>console.log("Registro ok"))
//     .catch(e=>console.log(e));

async function listarCursos(){
    const cursos = await Curso
        .find({publicado:true})
        .limit(10)
        .sort({autor:-1})
        .select({nombre:1,etiquetas:1});
    console.log(cursos);
}

listarCursos();