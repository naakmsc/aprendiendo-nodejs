const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario_model");
// const Joi = require("@hapi/joi");
const ruta = express.Router();

ruta.post("/",(req,res)=>{
    Usuario.findOne({email:req.body.email})
        .then(datos => {
            if(datos){
                const passwordValido = bcrypt.compareSync(req.body.password,datos.password);
                if(!passwordValido) return res.status(400).json({error:"ok",msj:"Usuario o contraseña incorrecta"});
                //Json Web Token
                // const jwtoken = jwt.sign({
                //     _id:datos._id,
                //     nombre:datos.nombre,
                //     email:datos.email
                // },"password");

                //Otra forma
                const jwtoken = jwt.sign({
                    data:{_id:datos._id,nombre:datos.nombre,email:datos.email}
                },"secret",{expiresIn: 1 * 60});

                res.send({
                    usuario:{
                        _id:datos._id,
                        nombre:datos.nombre,
                        email:datos.email
                    },
                    token:jwtoken
                });
            }else{
                res.status(400).json({
                    error: "ok",
                    msj: "Usuario o contraseña incorrecta."
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                error: "ok",
                msj : "Error en el servicio " + err
            });
        });
});
module.exports = ruta;