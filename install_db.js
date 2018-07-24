var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    
});
var fs = require('fs')

//Creo un esquema para la futura tabla Ads
var adsSchema = mongoose.Schema({
    productName: {
      type: String, 
      lowercase: true
    }, 
    forSale: Boolean,
    price: Number, 
    image: String, 
    tags: Array
  })

  // Creo el modelo 'Ads' a partir del esquema anterior
  var Ads = mongoose.model ('Ads', adsSchema)

  // Elimino todo el contenido de la tabla Ads
  Ads.remove(function (err){
      if (err) return console.log('hubo un error', err)
      console.log('base borrada')
  }).then(getAds)
    
  function getAds () {
      // leo archivo ads.json
      fs.readFile('./ads.json', 'utf-8', (err, data) => {
        if (err) throw err;
      let ads = JSON.parse(data)
      //inserto los anuncios en la base de datos
      Ads.insertMany(ads, function (err){
        if (err) return console.log(err)
      })
      
    });
 } 
