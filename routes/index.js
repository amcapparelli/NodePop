var express = require('express');
var router = express.Router();
const Ads = require('../lib/createModels')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const anuncios = await Ads.find().exec()
      res.render('index', function (err, html){
        res.send(`<h1> ${anuncios} </h1>`)
        
      })
  } catch (err) {
      next(err)
  }
  
});

module.exports = router;
