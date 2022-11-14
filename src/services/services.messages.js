const knex = require('knex');
const options = require('../../db/sqlite');

class ClientSql {
    constructor(config) {
        this.knex = knex(config)
    }

    async createTable() {
        await this.knex.schema.dropTableIfExists('messages');
        await this.knex.schema.createTable('messages', table => {
            table.increments('id').primary();
            table.string('email', 50).notNullable();
            table.string('time', 50).notNullable();
            table.string('msg', 140).notNullable();
        })
    }

    async getAllMessages() {
        // return await this.knex.from('ecommerce').select('*');
        return await this.knex.select('*').from('messages');
    }

    async saveMessage(message) {
        await this.knex('messages').insert(message);
    }

    async close() {
        await this.knex.destroy();
    }
}

const dbSqlite = new ClientSql(options);

module.exports = { dbSqlite };