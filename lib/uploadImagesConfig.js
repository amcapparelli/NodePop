'use strict'
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'imagesUploaded'))
    }
})

module.exports = multer({ storage: storage })