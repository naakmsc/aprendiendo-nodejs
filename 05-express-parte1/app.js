const express = require("express");
const app = express();
require("dotenv").config();
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
    res.send(["hello",["Mundo"]]);
});

app.get("/api/usuarios/:id",(req,res)=>{
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if(!usuario)
        res.status(404).send("El usuario no fue encontrado");
    else
        res.send(usuario);
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});