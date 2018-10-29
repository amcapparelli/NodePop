'use strict'

const cote = require('cote')

const responder = new cote.Responder({ name: 'upload images responder' })

    responder.on('uploadImage', (req, done) => {
    console.log('servicio: peticion de: ',  Date.now())

    const result = 
    done(result)
})


