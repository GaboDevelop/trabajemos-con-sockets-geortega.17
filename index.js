//Importando libreria net en la constante 'net'
const net = require('net');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Host y puerto del servidor
const hostname = '127.0.0.1';
const port = 19876;

const socket = new net.Socket();

const input = ()=>{
    rl.question("Envia un mensaje al servidor: ", function(data_str) {
        socket.write(data_str);
    });
}

socket.on('connect',function(){
    console.log("Conexion exitosa con: "+ hostname+" en el puerto "+ port);
    input();
    /*socket.removeAllListeners('error');
    socket.destroy();*/
});

socket.on('error',function(){
    console.log("No se pudo establecer conexion con el servidor")
})

socket.on('data', function (data) {
    console.log("Servidor respondio: "+data)
    input();
});

rl.on("close", function() {
    process.exit(0);
});





socket.connect(port,hostname);