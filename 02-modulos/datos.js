let url = "www.hello.com";

function datos(){
    console.log(url);
}

module.exports.log = datos;
module.exports.url = url;

console.log(module);