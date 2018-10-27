'use strict'

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const Ads = require('../../lib/createModels')
const getParams  = require('../../lib/functions')
const validations = require('../../lib/validations')
const jwtAuth = require('../../lib/jwtAuth')

router.use(jwtAuth())

router.get('/', validations, getParams)

router.post('/', [
    check('productName').isAlphanumeric().withMessage('Required field, only letters and numbers'), 
    check('image').isURL().withMessage('Must be an URL'),
    check('price').isNumeric().withMessage('Required field, must be numeric'),
    check('forSale').isBoolean().withMessage('Required field, must be a boolean'),
    check('tags').isAlpha().withMessage('Must be a string')
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