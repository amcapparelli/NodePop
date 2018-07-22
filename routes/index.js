var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    
});

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
  
  // Creo un elemento de acuerdo al modelo Ads
  var ad1 = new Ads ({productName: 'publicidadUno', 
                      forSale: true, 
                      price: 40
                      })
  
  // Elimino todo el contenido de la tabla Ads
  Ads.remove(function (err ){
    if (err) return console.error(err)
  })
  
  // Guardo un elemento (ad1) en tabla Ads
  ad1.save( function (err, ad1 ) {
    if (err) return console.error (err)
    
  })

  // recupero todos los elementos de la tabla ads para mostrarlos por consola
  Ads.find (function (err, ads){
    if (err) return console.error (err)
    console.log(ads)
  })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

module.exports = router;
