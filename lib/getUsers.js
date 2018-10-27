const db = require('../lib/connMongoose')
const fetch = require('node-fetch')
const Users = require('../lib/usersModels')


db.once('open', async () => {
    try {
        const users = await fetch('https://randomuser.me/api/?results=10&seed=amc')
        .then (response => response.json())
        .then (randomUsers => {
            return randomUsers.results
        }) 
        const usersData = users.map(user  => {
            return {
                name: user.name.first,
                password: user.login.uuid
            }
        }) 
        await Users.insertMany(usersData, function (err, docs){
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


   
