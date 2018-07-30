
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

  adsSchema.statics.show = function (filter, limit, page, sort, priceMin, priceMax, forsale){
    const query = Ads.find(filter)
    query.limit(limit)
    query.skip(page)
    query.sort(sort)
    if (priceMin){
      query.where({price: {$gte: priceMin}})
    }
    if (priceMax){
      query.where({price: {$lte: priceMax}})
    }
    if (forsale) {
      query.where({forSale: forsale})
    } 
    return query.exec()
  }

  // Creo el modelo 'Ads' a partir del esquema anterior
  var Ads = mongoose.model ('Ads', adsSchema)

module.exports = Ads
