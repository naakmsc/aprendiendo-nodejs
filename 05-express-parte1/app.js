const express = require("express");
const app = express();
const Joi = require("@hapi/joi");
require("dotenv").config();
app.use(express.json());
// app.get(); //Peticion
// app.post(); //Envio de datos
// app.put(); //Actualizacion
// app.delete(); //Eliminacion

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
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if(!usuario)
        res.status(404).send("El usuario no fue encontrado");
    else
        res.send(usuario);
});

app.post("/api/usuarios",(req,res)=>{
    //Validar datos
    const schema = Joi.object({
        nombre:Joi
            .string()
            .min(3)
            .required()
    });

    const {error, value} = schema.validate({nombre:req.body.nombre});
    
    if(!error){
        //procesar datos
        const usuario = {
            id : usuarios.length + 1,
            nombre : value
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
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if(!usuario){
        res.status(404).send("El usuario no fue encontrado");
        return;
    }

        const schema = Joi.object({
            nombre:Joi.string().min(3).required()
        });
    
        const {error,value} = schema.validate({nombre:req.body.nombre});
        
        if(error){
            const mensaje = error.details[0].message
            res.status(400).send(mensaje);
            return;
        }

        usuario.nombre = value.nombre;
        res.send(usuarios);
});


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});