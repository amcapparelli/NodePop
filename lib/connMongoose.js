'use strict'

require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE_DB_CONNECTION, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Conectado a la base de datos:', db.name)
});

module.exports = db
