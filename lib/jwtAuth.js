'use strict'

const jwt = require('jsonwebtoken')

function verifyToken () {
    return (req, res, next) => {
        //busca el token en el body o en la querystring o en la cabecera
        const token = req.body.token || req.query.token || req.get('x-access-token')
        if (!token) {
            const error = new Error('no token provided')
            res.json({success: false, 
                      code: 401,
                      error: 'Authentication required'})
            return
        }
        jwt.verify(token, process.env.JWT_SECRET, (error, tokendecoded) => {
            if (error) {
                res.json({success: false, error: error.message})
                return
            }
        req.apiUserId = tokendecoded._id
        next()
        })
    }
}

module.exports = verifyToken