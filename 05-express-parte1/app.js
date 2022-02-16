const express = require("express");
const app = express();
require("dotenv").config();
// app.get(); //Peticion
// app.post(); //Envio de datos
// app.put(); //Actualizacion
// app.delete(); //Eliminacion

app.get("/",(req,res)=>{
    res.send("Hola Mundo desde Express...");
});

app.get("/api/usuarios",(req,res)=>{
    res.send(["hello",["Mundo"]]);
});

app.get("/api/usuarios/:years/:month",(req,res)=>{
    res.send(req.params);
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});