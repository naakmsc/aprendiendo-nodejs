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


// //Funciones Flechas

// //Funciones en ES5
// const years = [2000,2005,2008,2012];

// var edad5 = years.map(function(el){
//     return 2019 - el;
// });

// // console.log(edad5);

// //Funciones de ES6+ tipo Flecha
// let actual = 2019;
// let edad6 = years.map(el=>{return actual - el});
// console.log(edad6);


// //Funciones CallBack

// function mensaje(n1,n2,callback){
//     let resultado = n1 + n2;
//     console.log("Mensaje antes de la llamada Callback");
//     callback(resultado);
// }

// function saludo(res){
//     console.log(`Resultado ${res}`);
// }

// // mensaje(5,8,saludo);

// setTimeout(()=>console.log("Esto se va a ejecutar luego de 3 segundos")
// ,3000);

// const mensaje = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         if(false)
//             resolve("Hello Resolve");
//         else
//             reject("Error hello");
//     },3000);
// });

// mensaje
//     .then(sms=>{
//         console.log(sms);
//     })
//     .catch(error =>{
//         console.log(error);
//     });

function mensaje(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(true)
                resolve("Funcionando luego de 3 segundos");
            else
                reject("Hubo un error");
        },3000);
    });
}

async function llamadaAsync(){
    const resultado = await mensaje();
    console.log("Llamando...");
    return resultado;
}

llamadaAsync()
    .then((x)=>{
        console.log(x);
    })
    .catch((e)=>{
        console.log(e);
    });