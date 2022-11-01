const socket = io.connect();

const title = document.getElementById('title')
const stock = document.getElementById('stock')
const price = document.getElementById('price')
const img = document.getElementById('img')
const frmNewProduct = document.getElementById('frmNewProduct')
const tbody = document.getElementById('tbody');

frmNewProduct.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const newData = {
            title: title.value,
            stock: stock.value,
            price: price.value,
            img: img.value
        }
        const url = 'http://localhost:8080/productos';
        response = await postData(url, newData);
    } catch (error) {
        console.log(error)
    }
    title.value = '';
    stock.value = '';
    price.value = '';
    img.value = '';
})
socket.emit('allProds')
socket.on('producto', (prod) => {
    attachRow(prod);
});
const attachRow = (prod) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${prod.title}</td>
                        <td>${prod.stock}</td>
                        <td>${prod.price}</td>
                        <td>${prod.img}</td>`
    tbody.appendChild(row);
};
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//-----------------------------
//Configuration for the Chat
//-----------------------------
const frmChat = document.getElementById('frmChat')
const txtEmail = document.getElementById('txtEmail')
const txtMessage = document.getElementById('txtMessage')
const allMessages = document.getElementById('allMessages')

frmChat.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMsg = {
        email: txtEmail.value,
        msg: txtMessage.value
    }
    //send new message to the server
    socket.emit('newMessage', newMsg)
    txtEmail.value = ''
    txtMessage.value = ''
})
//request all messages from the server
socket.emit('allMessages')

//receive messages from the server 
socket.on('chatMessages', (msg) => {
    const email = document.createElement('p')
    const time = document.createElement('p')
    const mensaje = document.createElement('p')
    const formatedMessage = document.createElement('p')

    email.innerText = msg.email;
    email.style.color = 'blue'
    time.innerText = msg.time;
    time.style.color = 'red'
    mensaje.innerText = msg.msg;
    mensaje.style.color = 'green'

    formatedMessage.appendChild(email);
    formatedMessage.appendChild(time);
    formatedMessage.appendChild(mensaje);

    allMessages.appendChild(formatedMessage);
    //allMessages.value += `${msg.email} [${msg.time}] : ${msg.msg} \n`
    //allMessages.scrollTop = allMessages.scrollHeight

})