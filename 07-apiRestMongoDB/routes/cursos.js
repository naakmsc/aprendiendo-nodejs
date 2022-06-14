const express = require("express");
const Curso = require("../models/curso_model");
const verificarToken = require("../middlewares/auth");
const ruta = express.Router();

ruta.get("/",verificarToken,(req,res) => {
    let result = listarCursos();
    result.then(cursos => {
        res.json({cursos});
    }).catch(error => {
        res.status(400).json({ERROR:error});
    });
});

//Registrando Curso
ruta.post("/",verificarToken,(req,res) => {
    let result = crearCurso(req.body);

    result.then(valor => {
        res.json({curso:valor});
    }).catch(error => {
        res.status(400).json({ERROR:error});
    });
});

//Actualizar Curso

ruta.put("/:id",verificarToken,(req,res) => {
    let result = actualizarCurso(req.params.id,req.body);
    result.then(valor => {
        res.json({Curso:valor});
    }).catch(error => {
        res.status(400).json({ERROR:error});
    });
});

//Eliminar Curso
ruta.delete("/:id",verificarToken,(req,res) => {
    let result = eliminarCurso(req.params.id);
    result.then(valor => {
        res.json({Curso:valor});
    }).catch(error => {
        res.status(400).json({ERROR:error});
    });
});

//Funcion para crear
async function crearCurso(body){
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.desc
    });

    return await curso.save();
}

//Funcion para actualizar Curso
async function actualizarCurso(id,body){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set: {
            titulo: body.titulo,
            descripcion: body.desc
        }
    },{new:true});
    return curso;
}

//Funcion para eleminar/ desactivar Curso
async function eliminarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado:false
        }
    },{new:true});
    return curso;
}

//Funcion para listar cursos
async function listarCursos(){
    let cursos = await Curso.find();
    return cursos;
}

module.exports = ruta;