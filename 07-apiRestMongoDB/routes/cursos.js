const express = require("express");
const ruta = express.Router();

ruta.get("/",(req,res)=>{
    res.json("listo el GET de cursos.");
});

module.exports = ruta;