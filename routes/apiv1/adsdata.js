'use strict'

const express = require('express')
const router = express.Router()
const Ads = require('../../lib/createModels')

router.get('/', async (req, res, next) => {
    try {
        // Recojo los posibles filtros de la URL
        const filter = {}
        const tag = req.query.tag
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const sort = req.query.sort
        const priceMin = parseInt(req.query.pricemin)
        const priceMax = parseInt(req.query.pricemax)
        const forsale = req.query.forsale
        const prodname = req.query.prodname
        
        //si se incluyen tags, busca en el array de tags para mostrar coincidencias
        if (tag){
          filter.tags = tag
        }
        if (prodname) {
            filter.productName = {$regex: "^" + prodname}
        }
    
        /* Consulto a la BD con los filtros y recojo resultados en la variable adsToShow 
        con el nombre y el precio del producto */
        const allAds = await Ads.show(filter, limit, page, sort, priceMin, priceMax, forsale)
        
        console.log(allTags)
      
          res.json ({
              success: true, 
              result: allAds
            })

      } catch (err) {
          next(err)
      }
    })

    router.post('/', async (req, res, next) => {
        try{
            const newAdData = req.body
            const newAd = new Ads(newAdData)
            const newAdSaved = await newAd.save()
            res.json({success: true, result: newAdSaved})
        } catch (err) {
            next(err)
        }
    })



  module.exports = router