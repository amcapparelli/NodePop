'use strict'

const express = require('express')
const router = express.Router()
const Ads = require('../../lib/createModels')
const getParams = require('../../lib/functions')

router.get('/', getParams)

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