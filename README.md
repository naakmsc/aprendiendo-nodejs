# aprendiendo-nodejs
Aprendiendo Node js

- Inicializar un proyecto con Node Package Control `node init`

- Version de Node `node -v`
- Instalar un paquete con npm `npm i paquete`
- Instalar un paquete global con npm `npm install -g paquete`
- Instalar un paquete local para desarrollo `node install --save-dev paquete` o `npm i -D paquete`
- Instalar un paquete abreviado `npm i paquete`
- Instalar un paquete con una version especifica con npm `npm i paquete@1.0.0`
- Package Control de paquetes NPM `npm init` o `npm init --yes` para saltar la configuracion 
- Instalar un paquete dependiente anterior `npm i paquete --save` (ya no es necesario el --save)
- Ver lista de paquetes instalados `npm list` o `npm list --depth=0`
- Ver dependencias de un paquete `npm view paquete dependencies`
- Instalar de forma global "npm check updates" para actualizar paquetes `npm i -g npm-check-updates`
- Revisar actualizaciones con el paquete npm check updates en nuestro proyecto y global `npm-check-updates`
- Hacer un upgrade del package.json de paquetes con npm check updates en nuestro proyecto `ncu -u` luego debemos hacer un `npm install` para que se descarguen
- Desinstalar un paquete de node `npm uninstaller paquete` o `npm un paquete`
- Desinstalar un paquete global `npm uninstaller -g paquete` o `npm un -g paquete`

## NPM
- Instalar un paquete al proyecto:
> npm install paquete

## Express
- Instalar Exppress de forma local `npm install express --save`