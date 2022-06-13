const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario_model");
// const Joi = require("@hapi/joi");
const ruta = express.Router();

ruta.post("/",(req,res) => {
    Usuario.findOne({email:req.body.email})
        .then(datos => {
            if(datos){
                const passValido = bcrypt.compareSync(req.body.password,datos.password);
                if(!passValido){
                    res.status(400).json({error:"ok",msj:"Usuario o Contraseña incorrecta."});
                }else{
                    res.json(datos);
                }
                
            }else{
                res.status(400).json({
                    error: "ok",
                    msj: "Usuario o contraseña incorrecta"
                });
            }
        })
        .catch(error => {
            res.status(400).json({
                error: "ok",
                msj: "Error >>>> " + error
            });
        });
});

module.exports = ruta;