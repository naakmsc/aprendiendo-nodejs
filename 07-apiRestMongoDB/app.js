const usuarios = require("./routes/usuarios");
const cursos = require("./routes/cursos");
const auth = require("./routes/auth");
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

//Conectarnos a la BD
mongoose.connect(config.get("configDB.HOST"))
    .then(() => console.log("Base Conectada"))
    .catch((e) => console.log("Error DB: >>>>",e));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/usuarios/",usuarios);
app.use("/api/cursos",cursos);
app.use("/auth/",auth);

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log("API Rest Full Ok...",port));