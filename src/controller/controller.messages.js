const db = require('../../db/mariaDB');
const { dbSqlite } = require('../services/services.messages');

const listMessages = async () => {
    try {
        return await dbSqlite.getAllMessages();
    } catch (error) {
        console.log(error);
    }
}
const saveNewMessage = async (obj) => {
    try {
        await dbSqlite.saveMessage(obj)
    } catch (error) {
        console.log(error);
    } finally {
        await dbSqlite.close();
    }
}

module.exports = {
    listMessages,
    saveNewMessage,
}