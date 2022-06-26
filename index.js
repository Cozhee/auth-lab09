'use strict'

const server = require('./server')
const { sequelize } = require('./models/index')

const { person, item } = require('./models/index')

async function start (){
    try {
        await sequelize.sync({force: true})
        // await person.create({name: 'Cody', password: 'test123', role: 'writer'})
        // await item.create({name: 'basketball', quantity: 20})
        // await item.create({name: 'baseball', quantity: 0})

        console.log('Connection a go!')
    } catch(err) {
        console.log(err)
    }
}

start()
server.start()