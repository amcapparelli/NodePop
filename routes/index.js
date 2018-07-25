var express = require('express');
var router = express.Router();
const Ads = require('../lib/createModels')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const anuncios = await Ads.find()
    const productNames =[]
    const productPrices =[]
    for (let i = 0; i < anuncios.length; i++){
        productNames.push(anuncios[i].productName)
        productPrices.push(anuncios[i].price)
    }
      res.render('index')
  } catch (err) {
      next(err)
  }
  
});

module.exports = router;
