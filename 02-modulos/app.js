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

// //Modulo Eventos
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// //Registrar el Listener
// emitter.on("mensajeLoger",(args)=>{
//     console.log("Listener llamado...",args.id);
// });

// //Registrar el evento
// emitter.emit("mensajeLoger",{id:1,url:"wwww.google.com"});


//Modulo HTTP

const http = require("http");
const server = http.createServer((req,res)=>{
    if(req.url=== "/"){
        res.write("hello mundo");
        res.end();
    }

    if(req.url === "/api/productos"){
        res.write(JSON.stringify(["mouse","teclado","cpu"]));
        res.end();
    }
});

// server.on("connection",(puerto) =>{
//     console.log("nueva conexion...");
// });

server.listen(3000);

console.log("Servidor escuchando....");