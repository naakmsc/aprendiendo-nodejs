// //ES5 - Variables
// var nombre = "Jai";
// console.log(nombre);
// nombre = "isai";
// console.log(nombre);

// //ES6+ - Variables
// const nombre6 = "oscar";
// let edad = 35;
// console.log(nombre6);
// console.log(edad);
// edad = 40;
// console.log(edad);


//Funciones Flechas

//Funciones en ES5
const years = [2000,2005,2008,2012];

var edad5 = years.map(function(el){
    return 2019 - el;
});

// console.log(edad5);

//Funciones de ES6+ tipo Flecha
let actual = 2019;
let edad6 = years.map(el=>{return actual - el});
console.log(edad6);