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
const sharp = require('sharp');


router.use(jwtAuth())

router.get('/', validationsGET, getParams)

router.post('/',  upload.single('imageFile'), validationsPOST, async (req, res, next) => {
    try{
        validationResult(req).throw()
        const newAdData = req.body
        const newAd = new Ads(newAdData)
        const newAdSaved = await newAd.save()

        sharp(req.file.path)
        .resize (100, 100)
        .toFile('imagesUploaded/thumbnails/thumbnail_'+req.file.originalname, function(err) {
            if (err){
                console.log('Error al crear el thumbnail', err)
                return
            } 
            console.log('Thumbnail creado')
        })

        res.json({success: true, result: newAdSaved})
    } catch (err) {
        next(err)
    }
})

module.exports = router