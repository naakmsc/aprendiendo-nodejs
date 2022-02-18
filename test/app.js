require("dotenv").config();
const config = require("config");


// process.env.PORT = 3000;
console.log(process.env.PORT);
// process.env.NODE_ENV = "production";
console.log(process.env.NODE_ENV);
console.log(process.env.HELLO);
console.log("Nombre: "+config.get("nombre"));
console.log(process.env.VIRUS);

