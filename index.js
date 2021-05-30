//Importando libreria net en la constante 'net'
const net = require('net');
const dgram = require('dgram');
const readline = require("readline");
const crypto = require('crypto')



//Host y puerto del servidor y puerto listen UDP
const hostname = process.argv[2] || '127.0.0.1';
const port = process.argv[3] || 19876;
const port_listen = process.argv[4] ||15601;



//Creando instancias de sockets y entrada por consola
const socket = new net.Socket();
const socketListen = dgram.createSocket('udp4');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



socketListen.on('message', function (msg, info){
    const str = Buffer.from(msg.toString(), 'base64').toString('utf8')
    const hash = crypto.createHash('md5').update(str).digest("hex")
    console.log("se recibio un mensaje por upd del servidor: "+str);
    console.log("Su transformacion a md5 es: "+hash)
 });

socketListen.on('listening', function(){
    const address = socketListen.address();
    console.log("Escuchando cliente por UDP en: "+ address.address + ":" + address.port);
});


socket.on('connect',function(){
    console.log("Conexion exitosa con: "+ hostname+" en el puerto "+ port);
    input();
});

socket.on('error',function(){
    console.log("No se pudo establecer conexion con el servidor")
    disconnect();
})

socket.on('data', function (data) {
    const data_str = data.toString().trim();
    console.log("Servidor respondio: "+data_str);
    console.log("=========================================");
    if(
        data_str == "error invalid user name" ||
        data_str == "error invalid command" ||
        data_str == "error unvalidated user" ||
        data_str == "error bad checksum" ||
        data_str == "error invalid checksum format" ||
        data_str == "ok bye"
    ){
        disconnect();
    }else{
        input();
    }
});

const disconnect = ()=> {
    console.log("Desconectando...")
    socket.removeAllListeners('error');
    socket.destroy();
    process.exit(1);
}

const input = ()=>{
    rl.question("Envia un mensaje al servidor: ", function(data_str) {
        socket.write(data_str);
    });
}

rl.on("close", function() {
    process.exit(0);
});



socketListen.bind(port_listen);
socket.connect(port,hostname);