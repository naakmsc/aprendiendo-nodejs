function log(req,res,next){
    console.log("Autenticado");
    next();
}

module.exports = log;