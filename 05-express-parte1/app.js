const express = require("express");
const app = express();
const Joi = require("@hapi/joi");
const logger = require("./logger");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(logger);

const usuarios = [
    {id: 1, nombre: "Jai"},
    {id: 2, nombre: "Isai"},
    {id: 3, nombre: "Oscar"},
];

app.get("/",(req,res)=>{
    res.send("Hola Mundo desde Express...");
});

app.get("/api/usuarios",(req,res)=>{
    res.send(usuarios);
});

app.get("/api/usuarios/:id",(req,res)=>{
    // let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    let usuario = existeUsuario(req.params.id);
    if(!usuario)
        res.status(404).send("El usuario no fue encontrado");
    else
        res.send(usuario);
});

app.post("/api/usuarios",(req,res)=>{

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

app.put("/api/usuarios/:id",(req,res)=>{
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

app.delete("/api/usuarios/:id",(req,res)=>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send("El usuario no fue encontrado");
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index,1);
    res.send(usuario);

})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
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