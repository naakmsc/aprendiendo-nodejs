const express = require("express");
const Curso = require("../models/curso_model");
const ruta = express.Router();

ruta.get("/",(req,res)=>{
    res.json("listo el GET de cursos.");
});

async function crearCurso(body){
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion
    });
    return await curso.save();
}

module.exports = ruta;