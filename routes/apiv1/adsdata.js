'use strict'

const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator/check')
const Ads = require('../../lib/createModels')
const getParams  = require('../../lib/functions')
const validationsGET = require('../../lib/validationsGET')
const validationsPOST = require('../../lib/validationsPOST')
const jwtAuth = require('../../lib/jwtAuth')
const upload = require('../../lib/uploadImagesConfig')
const publisher = require('../../lib/rabbitMQ/publisher')


router.use(jwtAuth())

router.get('/', validationsGET, getParams)

router.post('/',  upload.single('imageFile'), validationsPOST, async (req, res, next) => {
    try{
        validationResult(req).throw()
        const newAdData = req.body
        newAdData.imageFile = req.file.path
        const newAd = new Ads(newAdData)
        const newAdSaved = await newAd.save()
        publisher(req.file.path)
        res.json({success: true, result: newAdSaved})
    } catch (err) {
        next(err)
    }
})

module.exports = router