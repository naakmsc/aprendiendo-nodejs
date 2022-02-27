const express = require("express");
const Curso = require("../models/curso_model");
const verificarToken = require("../middlewares/auth");
const ruta = express.Router();
const Joi = require("@hapi/joi");

ruta.get("/",verificarToken,(req,res)=>{
    let result = listarCursosActivos();
    result
        .then(cursos => {
            res.json(cursos);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

const schema = Joi.object({
    titulo : Joi.string()
        .min(5)
        .max(30)
        .required()
    ,descripcion : Joi.string()
        .min(10)
        .max(50)
});


ruta.post("/",verificarToken,(req,res)=>{
    let body = req.body;

    const {error, value} = schema.validate({titulo : body.titulo,descripcion: body.descripcion});

    if(!error){
        let result = crearCurso(body);
        result
            .then(curso => {
                res.json({
                    curso
                });
            })
            .catch(error => {
                res.status(400).json({
                    error
                });
            });
    }else{
        res.status(400).json({
            error
        });
    }
});

ruta.put("/:id",verificarToken,(req,res)=>{
    let body = req.body;

    const {error, value} = schema.validate({titulo:body.titulo,descripcion:body.descripcion});

    if(!error){
        let result = actualizarCurso(req.params.id,body);
        result
            .then(curso=>{
                res.json({
                    curso
                });
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({
                    error
                });
            });
    }else{
        res.status(400).json({
            error
        });
    }


});

ruta.delete("/:id",verificarToken,(req,res)=>{
    let result = desactivarCurso(req.params.id);
    result
        .then(curso => {
            res.json(curso);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

async function listarCursosActivos(){
    let cursos = await Curso.find({estado:true});
    return cursos;
}

async function crearCurso(body){
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion
    });
    return await curso.save();
}

async function actualizarCurso(id,body){
    // let curso = await Curso.findOneAndUpdate(id,{
    let curso = await Curso.findOneAndUpdate({_id:id},{
        $set : {
            titulo : body.titulo,
            descripcion : body.descripcion
        }
    },{new:true})
    return curso
}

async function desactivarCurso(id){
    let curso = await Curso.findOneAndUpdate({_id:id},{
        $set : {
            estado:false
        }
    },{new: true});

    return curso;
}

module.exports = ruta;