const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario_model");
const ruta = express.Router();
const Joi = require("@hapi/joi");


const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(10)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string()
        .email({minDomainSegments:2,tlds:{ allow:["com","net"]}})
});

ruta.get("/",(req,res)=>{
    let result = listarUsuariosActivos();

    result
        .then(usuarios=>{
            res.json(usuarios);
        })
        .catch(error=>{
            res.status(400).json({
                ERROR:error
            });
        });
});

ruta.post("/",(req,res)=>{
    let body = req.body;

    Usuario.findOne({email:req.body.email},(error,user)=>{
        if(error){
            return res.status(400).json({error:"Server error"});
        }
        if(user){
            return res.status(400).json({
                msj: "Usuario ya existe"
            });
        }
    });

    const {error,value} = schema.validate({nombre:body.nombre, email:body.email});

    if(!error){
        let resultado = crearUsuario(body);
        resultado
            .then(user => {
                res.json({
                    nombre: user.nombre,
                    email: user.email
                });
            })
            .catch(err => {
                res.status(400).json({
                    Error: res
                });
            });
    }else{
        res.status(400).json({
            ERROR:error
        });
    }
    
});

ruta.put("/:email",(req,res)=>{

    const {error, value} = schema.validate({nombre:req.body.nombre});

    if(!error){
        let result = actualizarUsuario(req.params.email,req.body);

        result
            .then(response=>{
                res.json({
                    nombre :response.nombre,
                    email: response.email
                });
            })
            .catch(e => {
                res.status(400).json({
                    ERROR: e
                });
            });
    }else{
        res.status(400).json({
            ERROR:error
        });
    }


});

ruta.delete("/:email",(req,res)=>{
    let result = desactivarUsuario(req.params.email);
    result
        .then(valor => {
            res.json({
                nombre: valor.nombre,
                email: valor.email
            });
        })
        .catch(error => {
            res.status(400).json({
                ERROR:error
            });
        });
});

async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({"estado":true})
        .select({nombre:1,email:1});
    return usuarios;
}

async function crearUsuario(body){
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password,10)
    });

    return await usuario.save();
}

async function actualizarUsuario(email,body){
    let usuario = await Usuario.findOneAndUpdate({"email":email},{
        $set: {
            nombre:body.nombre,
            password: body.password
        }
    },{new : true});
    return usuario;
}

async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email":email},{
        $set: {
            estado:false
        }
    },{new : true});
    return usuario;
}

module.exports = ruta;