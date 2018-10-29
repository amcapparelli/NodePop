'use strict'

const { check } = require('express-validator/check')

const validationsPOST = [
    check('productName').isAlphanumeric().withMessage('Required field, only letters and numbers'), 
    check('image').optional({checkFalsy: true}).isURL().withMessage('Must be an URL'),
    check('price').isNumeric().withMessage('Required field, must be numeric'),
    check('forSale').isBoolean().withMessage('Required field, must be a boolean'),
    check('tags').optional({checkFalsy: true}).isAlpha().withMessage('Must be a string')
]

module.exports = validationsPOST