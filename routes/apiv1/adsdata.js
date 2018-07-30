'use strict'

const express = require('express')
const router = express.Router()
const Ads = require('../../lib/createModels')

router.get('/', async (req, res, next) => {
    try {
        // Posibles filtros de la URL
        const filter = {}
        const tag = req.query.tag
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const sort = req.query.sort
        const priceMin = parseInt(req.query.pricemin)
        const priceMax = parseInt(req.query.pricemax)
        const forsale = req.query.forsale
        const prodname = req.query.prodname
         
        if (tag){
          filter.tags = tag
        }
        if (prodname) {
            filter.productName = {$regex: "^" + prodname}
        }
    
        /* Extraigo de la base de datos los anuncios según los filtros y todos los tags disponibles */
        const allAds = await Ads.show(filter, limit, page, sort, priceMin, priceMax, forsale)
        const allTags = await Ads.distinct("tags")

        /* Respondo con un JSON */
          res.json ({
              success: true, 
              result: allAds, allTags
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