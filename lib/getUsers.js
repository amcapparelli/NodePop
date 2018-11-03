const db = require('../lib/connMongoose')
const fetch = require('node-fetch')
const Users = require('../lib/usersModels')


db.once('open', async () => {
    try {
        const users = await fetch('https://randomuser.me/api/?results=3&seed=amc')
        .then (response => response.json())
        .then (randomUsers => {
            return randomUsers.results
        }) 
        const usersData = users.map(user  => {
            return {
                email: user.email,
                name: user.name.first,
                password: user.login.uuid
            }
        }) 
        await Users.remove(function (err) {
            if (err) {
                console.log('Hubo un error al intentar borrar la BD de Usuarios: ', err)
                return
            }
        }) 
        await Users.insertMany([...usersData, {
            "email": "user@example.com",
            "name": "admin",
            "password": 1234
        }], function (err, docs){
            if (err) {
              console.log('hubo un error', err)
              return
            }
            console.log('nuevos usuarios insertados: ', docs.length)
            db.close()
        })
    } catch (err) {
        console.log('Hubo un error', err)
        return
    }
    
})


   
