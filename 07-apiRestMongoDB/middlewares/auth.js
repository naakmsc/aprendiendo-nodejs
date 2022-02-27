const jwt = require("jsonwebtoken");
const config = require("config");

let verificarToken = (req, res, next) =>{
    let token = req.get("Autorization");
    jwt.verify(token,config.get("configToken.SEED"),(error,decoded)=>{
        if(error){
            return res.status(401).json({
                error
            });
        }
        // res.send(token);
        req.usuario = decoded.usuario;
        // res.send(req.usuario);
        next();
    });
}

module.exports = verificarToken;