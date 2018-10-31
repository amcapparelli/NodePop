'use strict'

const connectionPromise = require('./connectAMQP');
const fs = require('fs')

const publisher = async (imagen) => {
    
    try {
        const conn = await connectionPromise
        const channel = await conn.createChannel()
        await channel.assertQueue('imageResizing', {
            durable: true
        })
        channel.sendToQueue('imageResizing', new Buffer( JSON.stringify(imagen) ), {
            persistent: true
        })
        console.log('publicada la imagen en la cola', imagen)
    } catch (error) {
        console.log('Error al publicar imagen en cola', error)
    }
}

module.exports = publisher