const express = require("express");
const Usuario = require("../models/usuario_model");
const ruta = express.Router();

ruta.get("/",(req,res)=>{
    res.json("listo el GET de usuarios.");
});

ruta.post("/",(req,res)=>{
    let resultado = crearUsuario(req.body);

    resultado
        .then(user => {
            res.json({
                valor: user
            });
        })
        .catch(err => {
            res.status(400).json({
                Error: res
            });
        });
});

ruta.put("/:email",(req,res)=>{
    let result = actualizarUsuario(req.params.email,req.body);

    result
        .then(response=>{
            res.json({
                value:response
            });
        })
        .catch(e => {
            res.status(400).json({
                ERROR: e
            });
        });
});

ruta.delete("/:email",(req,res)=>{
    let result = desactivarUsuario(req.params.email);
    result
        .then(valor => {
            res.json({
                usuario:valor
            });
        })
        .catch(error => {
            res.status(400).json({
                ERROR:error
            });
        });
});


async function crearUsuario(body){
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password
    });

    return await usuario.save();
}

async function actualizarUsuario(email,body){
    let usuario = await Usuario.findOneAndUpdate(email,{
        $set: {
            nombre:body.nombre,
            password: body.password
        }
    },{new : true});
    return usuario;
}

async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate(email,{
        $set: {
            estado:false
        }
    },{new : true});
    return usuario;
}

module.exports = ruta;