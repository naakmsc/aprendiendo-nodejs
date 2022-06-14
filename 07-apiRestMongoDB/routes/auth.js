const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
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
                    return res.status(400).json({error:"ok",msj:"Usuario o Contraseña incorrectaaaaa"});
                    console.log("pasa1");
                }else{
                    const jwtoken = jwt.sign({_id:datos._id,nombre:datos.nombre,email:datos.email},config.get("configToken.SEED"),{expiresIn:config.get("configToken.expiration")});
                    // res.json(datos);
                    // res.send(jwtoken);
                    res.json({
                        user:{
                            _id: datos._id,
                            nombre: datos.nombre,
                            email:datos.email
                        },
                        token:jwtoken
                    });
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