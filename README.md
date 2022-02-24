# aprendiendo-nodejs
Node js, es un entorno de desarrollo Javascript fuera del navegador. Podemos correr Javascript en modo servidor.
- Version de Node 
    ```bash
        node -v
    ```
## NPM
- Inicializar un proyecto con Node Package Control 
    ```bash 
        node init
    ```
- Instalar un paquete con npm 
    ```bash 
        npm i paquete
    ```
- Instalar un paquete global con npm 
    ```bash
        npm install -g paquete
    ```
- Instalar un paquete local para desarrollo 
    ```bash
        node install --save-dev paquete
    ```
    ```bash 
        npm i -D paquete
    ```
- Instalar un paquete abreviado 
    ```bash 
        npm i paquete
    ```
- Instalar un paquete con una version especifica con npm 
    ```bash
        npm i paquete@1.0.0
    ```
- Inicializar un proyecto con Package Control 
    ```bash
        npm init
    ```
    Para saltarse la configuracion
    ```bash
        npm init --yes
    ``` 
- Instalar un paquete dependiente anterior (Ahora se pueded omitir --save)
    ```bash 
        npm i paquete --save
    ```
- Ver lista de paquetes instalados 
    ```bash
        npm list
    ```
    ```bash 
        npm list --depth=0
    ```
- Ver dependencias de un paquete 
    ```bash 
        npm view paquete dependencies
    ```
- Instalar de forma global "npm check updates" para actualizar paquetes     
    ```bash
        npm i -g npm-check-updates
    ```
- Revisar actualizaciones con el paquete npm check updates en nuestro proyecto y global 
    ```bash
        npm-check-updates
    ```
- Hacer un upgrade del package.json de paquetes con npm check updates en nuestro proyecto 
    ```bash 
        ncu -u
    ``` 
    luego para que se descarguen debemos hacer un 
    ```bash 
        bash npm install
    ``` 
- Desinstalar un paquete de node 
    ```bash 
        npm uninstaller paquete
    ```
    ```bash 
        npm un paquete
    ```
- Desinstalar un paquete global 
    ```bash 
        npm uninstaller -g paquete
    ```
    ```bash 
        npm un -g paquete
    ```

## JAVASCRIPT - Cosas inprescindibles

- Funciones Async Await
```Javascript
    async function miFuncion(){
        let valor = await Clase.procesoX();
        return valor;
    }

    miFuncion()
        .then("Todo correcto o hacer algo")
        .catch("Capturar un error");

```
- Funciones flechas
```Javascript
    miFuncion()
        .then((result,otroValor)=> {
            "Hacer algo"
        })
        .catch(error => "Hacer algo con el error");
```

## Node
- Requrir de un modulo en nuestro proyecto
``` Javascript
    const nombre = require("modulo");
```
- Requerir de un modulo hecho y guardado en una ruta
```Javascript
    const nombre = require("./carpeta/modulo")
```
```Javascript
    const nombre = require("./carpeta/modulo.js");
```



## Express
- Instalar Exppress de forma local 
```bash 
    npm install express --save
```
- Requerir Express en el proyecto `app.js`
```Javascript
    const express = require("express");
    const app = express();
```
- Ejecutar el servidor
```Javascript
    const port = process.env.PORT || 3000;
    app.listen(port,() => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
```


## Mongoose
Mongoose es un paquete que nos ayuda a conectar e interactuar con BD MongoDB

- Instalar Paquete
```bash
    npm install mongoose
```
- Requerir mongodb en proyecto
```Javascript
    const mongoose = require("mongoose");
```
- Crear la conexion a la BD MongoDB
```Javascript
    mongoose.connect("mongodb://localhost:27017/nombreDB")
        .then(() => console.log("Conexion exitosa."))
        .catch((error));
```
- Crear Modelo para en mongoose en archivo  `usuario_model.js`
```Javascript
    //Importar Mongoose
    const mongoose = require("mongoose");
    //Crear modelo
    const usuarioSchema = mongoose.Schema({
        nombre:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email: {
            type:String,
            required:true
        },
        estado:{
            type:Boolean,
            default: true //Valor predeterminado
        }
    });
//Exportar modulo
module.exports = mongoose.model("Usuario",usuarioSchema);
```
Usarlo en un Route `usuario.js`
```Javascript
    //Importar Modelo
    const Usuario = require("../models/usuario_model");
```
- Insertar un documento en MongoDB
```Javascript
    //Si esta dentro de una funcion async debemos agrear await antes de usuario.save()
    let usuario = new Usuario({
        nombre: "valor",
        password: "valor",
        email: "valor"
    });
    /*await*/ usuario.save();
```