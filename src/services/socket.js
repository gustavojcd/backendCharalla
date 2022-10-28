const SocketIo = require('socket.io')
const { Contenedor } = require('../contenedor.js')
const productos = new Contenedor('src/data/products.json');
const { formatMessages } = require('../utils/messages');
let io;
const allMessages = []
const myWSServer = (server) => {
    io = SocketIo(server)
    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado!');
        console.log('ID SOCKET SERVER', socket.id);
        console.log('ID SOCKET CLIENTE', socket.client.id);

        //send all products to clients
        socket.on('allProds', () => {
            const allProds = productos.getAll();
            allProds.forEach((prod) => {
                socket.emit('producto', prod);
            });
        });

        //send all messages to clients
        socket.on('allMessages', () => {
            allMessages.forEach((msg) => {
                socket.emit('chatMessages', formatMessages(msg))
            })
        })

        //receive a message and store it in array of messages (allMessages[]) and send it to clients
        socket.on('newMessage',(nMsg)=>{
            allMessages.push(nMsg)
            io.emit('chatMessages', formatMessages(nMsg))
        })
    })
}

const socketEmit = (eventName, newProd) => {
    io.emit(eventName, newProd);
};

module.exports = {
    myWSServer,
    socketEmit
}
