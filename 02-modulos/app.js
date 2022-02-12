const datos = require("./datos.js");
datos.log("hello");

const path = require("path");

const objPath = path.parse(__filename);

console.log(objPath.name);