'use strict'

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
      // si el parámetro incluye un guion, los valores antes y después del mismo son usados para mostrar resultados
      // mayores, menores o iguales
      if (priceRange.includes('-')){
        let slicePosition = priceRange.indexOf('-')
        let a = parseInt(priceRange.slice(0, slicePosition))
        let b = parseInt(priceRange.slice(slicePosition+1))
        if ( b ) {
          query.where({price: {$lte: b}})
        }
        if ( a ) {
          query.where({price: {$gte: a}})
        }
      } else {
        // si no incluye guion, el valor muestra sólo resultados de coincidencia exacta
        let c = priceRange
        query.where({price: {$eq: c}})
      }
        
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

  adsSchema.index({ price: 1 })
  adsSchema.index({ productName: 1 })
  adsSchema.index({ tags: 1 })

  // Creo el modelo 'Ads' a partir del esquema anterior
  var Ads = mongoose.model ('Ads', adsSchema)

module.exports = Ads
