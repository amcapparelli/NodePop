'use strict'

require('dotenv').config();
const connectionPromise = require('./connectAMQP');
const sharp = require('sharp');

(async () => {
    
    const conn = await connectionPromise
    const channel = await conn.createChannel()

    await channel.assertQueue('imageResizing', {
        durable: true 
    })
    channel.prefetch(5)
    
    channel.consume('imageResizing', imagen => {
        const imagePath = imagen.content.toString().split('"').join('')
        const originalname = imagePath.substr(imagePath.lastIndexOf('/') + 1)
        sharp(imagePath)
        .resize (100, 100)
        .toFile('imagesUploaded/thumbnails/thumbnail_' + Date.now() + originalname, function(err) {
            if (err){
                console.log('Error al crear el thumbnail', err)
                return
            } 
            console.log('Thumbnail creado')
        })
        channel.ack(imagen)  
    })

})().catch(error => console.log('Hubo un error', error))

