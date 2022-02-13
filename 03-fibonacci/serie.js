const fs = require("fs");


function crearSerie(hasta){

    return new Promise((resolve, reject)=>{
        let f1 = 1;
        let f2 = 1;
        let serie ="";

        serie += `${f1}\t`;

        for(let i = 2;i <= hasta;i++){
            serie += `${f2}\t`;
            f2 = f1 + f2;
            f1 = f2-f1;
        }

        fs.writeFile("fibonacci.txt",serie,(err)=>{
            if(err) 
                reject("Error al crear archivo");
            else
                resolve("Archivo creado con Promesa");
        });
    });
}

module.exports = {
    crearSerie
};