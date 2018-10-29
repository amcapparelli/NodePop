'use strict'

const { check } = require('express-validator/check')

const validationsGET =  [
        check('pricemin').optional({ checkFalsy: true }).isNumeric().withMessage('pricemin must be a numeric value'),
        check('pricemax').optional({ checkFalsy: true }).isNumeric().withMessage('pricemax must be a numeric value'),
        check('limit').optional({ checkFalsy: true }).isNumeric().withMessage('limit must be a numeric value'),
        check('page').optional({ checkFalsy: true }).isNumeric().withMessage('page must be a numeric value'),
        check('forsale').optional({ checkFalsy: true }).isBoolean().withMessage('forsale must be a boolean'),
        check('tag').optional({ checkFalsy: true }).isAlpha().withMessage('tag must be a string'),
        check('pricerange').optional({checkFalsy: true}).matches(/^([0-9]+)?(-)?([0-9]+)?$/).withMessage('pricerange can only be an integer, then "-" and then another integer')
    ]

module.exports = validationsGET



