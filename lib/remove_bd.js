'use strict'

require('../lib/connMongoose')
const Ads = require('../lib/createModels')
const fs = require('fs')

// Elimino todo el contenido de la tabla Ads
async function removeDB () {
    await Ads.remove(function (err){
        if (err) {
        console.log('hubo un error', err)
        return
    }
        console.log('base borrada')
    })
    getAds()
}
    
    function getAds () {
      // leo archivo ads.json
      fs.readFile('./lib/ads.json', 'utf-8', (err, data) => {
        if (err) throw err;
      const { ads } = JSON.parse(data)
      //inserto los anuncios en la base de datos
      Ads.insertMany(ads, function (err, docs){
        if (err) {
          console.log('hubo un error', err)
          return
      }
        console.log('anuncios insertados: ', docs)
      })
    });
} 

removeDB()