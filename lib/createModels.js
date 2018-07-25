
const mongoose = require('mongoose')


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

module.exports = Ads
