'use strict'

const cote = require('cote')

const requester = new cote.Requester({name: 'upload images requester'})

        requester.send({
            type: 'uploadImage'
        }, 
        res => {
        console.log(`imagen ${res} `, Date.now())
})


