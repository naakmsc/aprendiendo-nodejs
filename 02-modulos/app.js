// const datos = require("./datos.js");
// datos.log("hello");



// //Modulo Path
// const path = require("path");

// const objPath = path.parse(__filename);

// console.log(objPath.name);



// //Modulo OS
// const os =  require("os");

// let memlibre = os.freemem();
// let memtotal = os.totalmem();

// console.log(`Memoria libre: ${memlibre} y memoria total: ${memtotal}`);

// //Modulo FIle System
// const fs = require("fs");
// const archivo = fs.readdirSync("./");
// console.log(archivo);

// fs.readdir("./", function(error,files){
//     if(error) console.log("Errorcito: ",error.message);
//     else console.log("Resultado: ",files);
// });

const EventEmitter = require("events");
const emitter = new EventEmitter();

//Registrar el Listener
emitter.on("mensajeLoger",(args)=>{
    console.log("Listener llamado...",args.id);
});

//Registrar el evento
emitter.emit("mensajeLoger",{id:1,url:"http://wwww.google.com"});