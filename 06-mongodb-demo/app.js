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
        nombre: "CSS",
        autor: "Burrix",
        etiquetas: ["Web","Internet","Style"],
        publicado:true
    });
    
    //Haciendo la peticion con await
    const result = await curso.save();
    console.log(result);
}

// crearCurso();

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

    //or
    //and
    const numberPage = 2;
    const sizePage = 5;

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
        // .and([{autor:"Naakmsc"},{publicado:false}])
        // .or([{autor:"Naakmsc"},{publicado:false}])
    //Empiece con con Naak
        // .find({autor:/^Naak/})
    //Cuando termina en una palabra o expresion
        // .find({autor:/i$/})
    //Cuando tiene un contenido especifico
        .find({autor:/.*.ey*/})
    //Paginacion
        .skip((numberPage -1)*sizePage)
        .limit(sizePage)
    //Fin Paginacion
        .sort({autor:-1})
        .select({nombre:1,etiquetas:1,autor:1});
    console.log(result);
}

// listarCursos();

//Actualizar
async function actualizarCurso(id){
    const curso = await Curso.findById(id);
    if(!curso) {
        console.log("Curso no encontrado");
        return;
    }
    curso.autor = "Balmore";
    curso.publicado = false;

    // curso.set({
    //     autor : "Salinas",
    //     publicado : false
    // });

    const result = await curso.save();
    console.log("Actualizado ",result);
}

// actualizarCurso("6285e1cbdf806b151561c04d");

async function actualizarCurso2(id){
    const result = await Curso.updateOne({_id:id},{
        $set:{
            nombre: "Estilos CSS",
            autor: "Salim",
            publicado : true
        }
    });

    console.log(result);
}

// actualizarCurso2("6285e1cbdf806b151561c04d");

async function actualizarCurso3(id){
    const result = await Curso.findByIdAndUpdate(id,{
        $set: {
            nombre: "Sass",
            autor: "Camerun",
            publicado : false
        }
    },{new:true});
    console.log(result);
}

// actualizarCurso3("6285e1cbdf806b151561c04d");

async function eliminarCurso(id){
    const result = await Curso.deleteOne({_id: id});
    // const result = await Curso.findByIdAndDelete(id);
    console.log(result);
}
eliminarCurso("6285e1cbdf806b151561c04d");