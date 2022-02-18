const express = require("express");
const ruta = express.Router();
const Joi = require("@hapi/joi");

const usuarios = [
    {id: 1, nombre: "Jai"},
    {id: 2, nombre: "Isai"},
    {id: 3, nombre: "Oscar"},
];

ruta.get("/",(req,res)=>{
    res.send(usuarios);
});

ruta.get("/:id",(req,res)=>{
    // let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    let usuario = existeUsuario(req.params.id);
    if(!usuario)
        res.status(404).send("El usuario no fue encontrado");
    else
        res.send(usuario);
});

ruta.post("/",(req,res)=>{

    // let body = req.body;
    // console.log(body.nombre);
    // res.json({
    //     body:body
    // });
    // return;
    //Validar datos
    const {error,value} = validarUsuario(req.body.nombre);
    
    if(!error){
        //procesar datos
        const usuario = {
            id : usuarios.length + 1,
            nombre : value.nombre
        };
        usuarios.push(usuario);
        res.send(usuario);
    }else{
        const mensaje = error.details[0].message
        console.log(error.details[0].context.limit);
        res.status(400).send(mensaje);
    }
});

ruta.put("/:id",(req,res)=>{
    //Si existe un valor
    // let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send("El usuario no fue encontrado");
        return;
    }
        const {error,value} = validarUsuario(req.body.nombre);
        
        if(error){
            const mensaje = error.details[0].message
            res.status(400).send(mensaje);
            return;
        }

        usuario.nombre = value.nombre;
        res.send(usuarios);
});

ruta.delete("/:id",(req,res)=>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send("El usuario no fue encontrado");
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index,1);
    res.send(usuario);

});

function existeUsuario(id){
    return usuarios.find(u => u.id === parseInt(id));
}

function validarUsuario(nom){
    const schema = Joi.object({
        nombre:Joi.string().min(3).required()
    });

    return (schema.validate({nombre:nom}));
}

module.exports = ruta;