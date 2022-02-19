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
        nombre:"React JS",
        autor: "Sasha Brown",
        etiquetas:["Programacion","framework"],
        publicado: true
    });

    const resultado = await curso.save();
    console.log(resultado);
}

// crearCurso()
//     .then(()=>console.log("Registro ok"))
//     .catch(e=>console.log(e));

async function listarCursos(){

    //eq (equal, igual)
    //ne (not equal, no igual)
    //gt (greater than, mayor que)
    //gte (greater than or equal to, mayor o igual que)
    //lt (less than, menor que)
    //lte (less than or equal to, menor o igual que)
    // in
    // nin (not in)
    //or
    //and

    const numPage = 2;
    const sizePage = 4;
    const cursos = await Curso
        // .find({publicado:true})
        // .find({precio: {$gte:10,$lte:30}})
        // .find({precio:{$in:[10,15,25]}})
        .find()
        // .and([{autor:"Juan"},{publicado:false}])
        // .or([{autor:"Grover"},{publicado:true}])
        //Empiece con las letras
        // .find({autor:/^Jua/})
        //Cuando termina en las letras
        // .find({autor:/an$/})
        //Cuando un campo tiene un contenido especifico
        // .find({autor:/.*ua.*/})
        .skip((numPage-1 )*sizePage)
        .limit(sizePage)
        .sort({autor:1})
        .select({nombre:1,autor:1});
    console.log(cursos);
}

// listarCursos()
//     .then(console.log("correcto"))
//     .catch((e)=>{
//     console.log("Errorcito: >>>>"+e);
// });


async function actualizarCurso(id){
    // const curso = await Curso.findById(id);
    // if(!curso){
    //     console.log("El curso no existe");
    //     return;
    // }
    // // curso.publicado = true;
    // // curso.autor = "Jai Vas";

    // curso.set({
    //     publicado : true,
    //     autor: "Jai Ger"
    // });

    // const resultado = await curso.save();
    // return resultado;

    const resultado = await Curso.update({_id: id},{
        $set:{
            autor: "Groverito",
            publicado : true
        }
    });
    return resultado;
}

actualizarCurso("62107d5844aee565f0608188")
    .then(res => {console.log("Actualizado :"+res)})
    .catch(err => {console.log("Error >>>> :"+err)});