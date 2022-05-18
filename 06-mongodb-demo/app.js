const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/demo")
    .then(()=> console.log("Conectado a MongoDB"))
    .catch(err => console.log("Error en MondoDB >>>",err));

//Modelo de nuestro documento cursos
const cursoSchema = new mongoose.Schema({
    nombre: String,
    autor: String,
    etiquetas: [String],
    fecha: {type:Date , default:Date.now},
    publicado: Boolean
});

//Creando la clase Curso junto al modelo
const Curso = mongoose.model("Curso",cursoSchema);

//Creando una funcion async
async function crearCurso(){
    //Creando el objeto
    const curso = new Curso({
        nombre: "C#",
        autor: "Isai",
        etiquetas: ["Desarrollo Desktop","Server App"],
        publicado:true
    });
    
    //Haciendo la peticion con await
    const result = await curso.save();
    console.log(result);
}

// crearCurso();4

//Creando la consulta con async
async function listarCursos(){
    // eq : igual
    // ne : no igual
    // gt : mayor que
    // gte : mayor o igual que
    // lt : menor que
    // lte : menor o igual a que
    // in : dentro de
    // nin : no dentro de
    const result = await Curso
        .find()
        // .find({publicado:tue})
        // .find({publicacion:{$eq:true}})
        // .find({publicacion:{$ne:false}})
        // .find({precio:{$gt:10}})
        // .find({precio:{$gte:11}})
        // .find({precio:{$lt:10}})
        // .find({precio:{$lte:30}})
        // .find({precio:{$gte:10,$lte:30}})
        // .find({precio:{$in:[20,10,15]}})
        // .find({precio:{$nin:[5,8,9]}})
        .limit(4)
        .sort({autor:-1})
        .select({nombre:1,etiquetas:1});
    console.log(result);
}

listarCursos();