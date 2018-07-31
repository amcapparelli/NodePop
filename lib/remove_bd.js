'use strict'

const readline = require('readline')
const fs = require('fs')
const db = require('../lib/connMongoose')
const Ads = require('../lib/createModels')

db.once('open', async () => {
    try {
        const response = await askBeforeRemove()
        if (response !== 'yes'){
            console.log('Proceso cancelado')
            process.exit()
        }
        await removeDB()
        
    } catch (err) {
        console.log('Hubo un error', err)
        process.exit(1)
    }
})

function askBeforeRemove () {
    return new Promise ((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question('Estás a punto de borrar la base de datos. ¿Quieres hacerlo? (yes/no)', 
            function (answer) {
                rl.close()
                resolve(answer)
            }
        )
    }) 
}


// Elimino todo el contenido de la tabla Ads
async function removeDB () {
    await Ads.remove(function (err){
        if (err) {
        console.log('hubo un error', err)
        return
    }
        console.log('base borrada:', db.name)
    })
    getAds()
    
}
    
async function getAds () {
      // leo archivo ads.json
      await fs.readFile('./lib/ads.json', 'utf-8', (err, data) => {
        if (err) throw err;
      const { ads } = JSON.parse(data)
      //inserto los anuncios en la base de datos
      Ads.insertMany(ads, function (err, docs){
        if (err) {
          console.log('hubo un error', err)
          return
      }
        console.log('nuevos anuncios insertados: ', docs.length)
        db.close()
      })
    });
} 