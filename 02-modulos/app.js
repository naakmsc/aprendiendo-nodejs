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

//Modulo FIle System
const fs = require("fs");
const archivo = fs.readdirSync("./");
console.log(archivo);

fs.readdir("./", function(error,files){
    if(error) console.log("Errorcito: ",error.message);
    else console.log("Resultado: ",files);
});