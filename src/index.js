const server = require('./services/server')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .option('port',{
        desc:'server port',
        default: '8080'
    })
    .argv

server.listen(argv.port)