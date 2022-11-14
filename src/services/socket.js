const SocketIo = require('socket.io')
const { formatMessages } = require('../utils/messages');
const { contenedor } = require('../services/services.products.js');
const { listMessages, saveNewMessage } = require('../controller/controller.messages');
const db = require('../../db/mariaDB');
let io;

const myWSServer = (server) => {
    io = SocketIo(server)
    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado!');
        console.log('ID SOCKET SERVER', socket.id);
        console.log('ID SOCKET CLIENTE', socket.client.id);

        //retrieve from database and send all products to clients
        socket.on('allProds', async () => {
            const allProds = await contenedor.getAll();
            allProds.forEach((prod) => {
                socket.emit('producto', prod);
            });
        });

        //retrieve from SQLite database and send all messages to clients
        socket.on('allMessages', async () => {
            const allMessages = await listMessages();
            allMessages.forEach((msg) => {
                socket.emit('chatMessages', msg)
            })
        })

        //receive a message and store it in SQLite database
        socket.on('newMessage', async (nMsg) => {
            io.emit('chatMessages', formatMessages(nMsg));
            await saveNewMessage(formatMessages(nMsg));
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
