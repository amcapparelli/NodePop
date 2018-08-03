
const mongoose = require('mongoose')


//Creo un esquema para la futura tabla Ads
var adsSchema = mongoose.Schema({
    productName: {
      type: String, 
      lowercase: true,
      required: true
    }, 
    forSale: {
      type: Boolean, 
      required: true
    },
    price: {
      type: Number,
      required: true
    }, 
    image: String, 
    tags: Array
  })

  adsSchema.statics.show = function (filter, limit, page, sort, priceRange, priceMin, priceMax, forsale){
    const query = Ads.find(filter)
    query.limit(limit)
    query.skip(page)
    query.sort(sort)
    
    if (priceRange){
        let slicePosition = priceRange.indexOf('-')
        let a = parseInt(priceRange.slice(0, slicePosition))
        let b = parseInt(priceRange.slice(slicePosition+1))
        query.where({price: {$gte: a, $lte: b}})
    }
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

  adsSchema.index({price: -1})

  // Creo el modelo 'Ads' a partir del esquema anterior
  var Ads = mongoose.model ('Ads', adsSchema)

module.exports = Ads
