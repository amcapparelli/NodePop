'use strict'

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const Ads = require('../../lib/createModels')
const getParams  = require('../../lib/functions')
const validations = require('../../lib/validations')

router.get('/', validations, getParams)

router.post('/', [
    check('productName').isAlphanumeric().withMessage('Only letters and numbers'), 
    check('image').isURL().withMessage('Image must be an URL'),
    check('price').isNumeric().withMessage('Price must be numeric'),
    check('forSale').isBoolean().withMessage('forSale must be a boolean'),
    check('tags').isAlpha().withMessage('tags must be a string')
], async (req, res, next) => {
    try{
        validationResult(req).throw()
        const newAdData = req.body
        const newAd = new Ads(newAdData)
        const newAdSaved = await newAd.save()
        res.json({success: true, result: newAdSaved})
    } catch (err) {
        next(err)
    }
})

  module.exports = router