require("dotenv").config();
const debug = require("debug")("app:inicio");
// const dbDebug = require("debug")("app:db");
const express = require("express");
const app = express();

const usuarios = require("./routes/usuarios");
const config = require("config");
// const logger = require("./logger");
const morgan = require("morgan");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api/usuarios",usuarios);
// app.use(logger);

//Configuracion de entornos
console.log("Aplicacion: "+config.get("nombre"));
console.log("DB Server: "+config.get("configDB.host"));
console.log("Puerto: "+process.env.PORT);


//Uso de un middleware de terceros
console.log(app.get("env"));
if(app.get("env")==="development"){
    app.use(morgan("tiny"));
    // console.log("Morgan habilitado...");
    debug("Morgan esta habilitado");
}

//Trabajo con base de datos
debug("Conectado a la base de datos");

app.get("/",(req,res)=>{
    res.send("Hola Mundo desde Express...");
});




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});

