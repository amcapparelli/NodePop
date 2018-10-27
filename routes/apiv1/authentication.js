'use strict'

const express = require('express')
const router = express.Router();
const Users = require('../../lib/usersModels');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    res.locals.error = ''
    res.render('login')
})

router.post('/', async (req, res, next) => {
    const email = req.body.email
    const pass = req.body.password

    const user = await Users.findOne({email})
    if(!user || pass !== user.password) {
        res.json({success: false, error: 'ese usuario no es válido'})
        return
    }
    
    //autenticación de usuario con jsonwebtoken
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    }, (error, token) => {
        if (error) {
            next(error)
            return
        }
        res.json({success: true, token: token})
    })
})

module.exports = router