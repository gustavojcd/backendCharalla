const fs = require("fs");

class Messages {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getData() {
        try {
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.log(error)
        }
    }
    async saveData(messages) {
        try {
            const data = JSON.stringify(messages, null, "\t");
            await fs.promises.writeFile(this.fileName, data);
        } catch (error) {
            console.log(error);
        }
    }
    async saveMessage(nMsg) {
        try {
            const messages = await this.getData();

            const newMessage = {
                email: nMsg.email,
                time: nMsg.time,
                msg: nMsg.msg,
            };

            messages.push(newMessage);

            await this.saveData(messages);
        } catch (error) {
           console.log(error);
        }
    }
}

const chat = new Messages("src/data/chat.json");

module.exports = {chat};