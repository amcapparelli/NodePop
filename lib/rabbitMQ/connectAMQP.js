'use strict'


const amqp = require('amqplib');

const url = process.env.AMQP_URL

const connectionPromise = amqp.connect(url)
    .catch(error => {
        console.log('Error al conectar AMQP', error)
    })


module.exports = connectionPromise
