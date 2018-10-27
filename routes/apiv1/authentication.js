'use strict'

const express = require('express')
const router = express.Router();
const Users = require('../../lib/usersModels');

router.get('/', (req, res, next) => {
    res.locals.error = ''
    res.render('login')
})

router.post('/', async (req, res, next) => {
    const email = req.body.email
    const pass = req.body.password

    const user = await Users.findOne({email})
    
    if(!user || pass !== user.password) {
        res.locals.error = 'ese usuario no es válido'
        res.render('login')
        return
    }

    res.redirect('/apiv1/adsdata')
})

module.exports = router