'use strict'

const { check } = require('express-validator/check')

const validations = [
    check('pricemin').optional({ checkFalsy: true }).isNumeric().withMessage('pricemin must be a numeric value'),
    check('forsale').optional({ checkFalsy: true }).isBoolean().withMessage('forsale must be a boolean'),
    check('tag').optional({ checkFalsy: true }).isAlpha().withMessage('tag must be a string'),
]

module.exports = validations