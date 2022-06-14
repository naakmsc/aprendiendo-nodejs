const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario_model");
const Joi = require("@hapi/joi");
const verificarToken = require("../middlewares/auth");
const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string().min(3).max(10).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}})
});



ruta.get("/",verificarToken,(req,res) => {
    let result = listarUsuariosActivos();
    result.then(usuarios => {
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json({ERROR:err});
    });
});

ruta.post("/",(req,res)=>{
    let body = req.body;
    // console.dir(res.headersSent); // false
    // res.send('OK');
    // console.dir(res.headersSent);

        Usuario.findOne({email:body.email},(error,user) => {
            if(error){
                return res.status(400).json({ERROR:"Error en el servicio"});
            }
            if(user){
                //Usuario si existe
                return res.status(400).json({Mensaje:"Email ya existe"});
                
            }else{
                const {error, value} = schema.validate({nombre:body.nombre,password:body.password,email:body.email});
                if(!error){
                    let result = crearUsuario(body);

                    result.then(user => {
                        res.json({
                            nombre: user.nombre,
                            email: user.email
                        })
                    }).catch(err => {
                        res.status(400).json({
                            error:err
                        })
                    });
                }else{
                    res.status(400).json({ERROR:error});
                }
            }
        });
});

ruta.put("/:email",verificarToken,(req,res)=>{
    let body = req.body

    const {error, valor} = schema.validate({nombre:body.nombre,password:body.password,email:body.email});

    if(!error){
        let result = actualizarUsuario(req.params.email,req.body);
        result.then(valor => {
            res.json({
                nombre:valor.nombre,
                email:valor.email
            });
        }).catch(err => {
            res.status(400).json({
                ERROR: err
            })
        });
    }else{
        res.status(400).json({ERROR:error});
    }

});

ruta.delete("/:email",verificarToken,(req,res)=>{
    let result = eliminarUsuario(req.params.email);
    result.then(valor=>{
        res.json({
            nombre:valor.nombre,
            email: valor.email
        });
    }).catch(err => {
        res.status(400).json({
            ERROR:err
        })
    });
});

//Listar usuarios
async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({estado:true}).select({nombre:1,email:1});
    return usuarios;
}

//Metodo para crear usuarios
async function crearUsuario(body){
    let usuario = new Usuario({
        email: body.email,
        nombre:body.nombre,
        password: bcrypt.hashSync(body.password,10)
    });

    return await usuario.save();
}

//Metodo para actualizar usuarios
async function actualizarUsuario(email,body){
    let usuario = await Usuario.findOneAndUpdate(email,{
        $set:{
            nombre:body.nombre,
            password:body.password
        }
    },{new:true});
    return usuario;
}

//Metodo para eliminar usuario o desactivar
async function eliminarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate(email,{
        $set:{
            estado:false
        }
    },{new:true});
    return usuario;
}

module.exports = ruta;