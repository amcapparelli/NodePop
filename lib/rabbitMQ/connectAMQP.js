'use strict'

const amqp = require('amqplib')

const url = 'amqp://iujonemd:fvIOYivZuBdqUzoUwXJgG45L4KVYC6lX@raven.rmq.cloudamqp.com/iujonemd'

const connectionPromise = amqp.connect(url)
    .catch(error => {
        console.log('Error al conectar AMQP', error)
    })


module.exports = connectionPromise
