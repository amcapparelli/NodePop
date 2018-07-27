var express = require('express');
var router = express.Router();
const Ads = require('../lib/createModels')

/* GET home page. */

router.get('/', async (req, res, next) => {
  try {
    // Recojo los posibles filtros de la URL
    const filter = {}
    const tag = req.query.tag
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const sort = req.query.sort
    const priceMin = parseInt(req.query.pricemin)
    const priceMax = parseInt(req.query.pricemax)
    
    //si se incluyen tags, busca en el array de tags para mostrar coincidencias
    if (tag){
      filter.tags = tag
    }

    /* Consulto a la BD con los filtros y recojo resultados en la variable adsToShow 
    con el nombre y el precio del producto */
    const allAds = await Ads.show(filter, limit, page, sort, priceMin, priceMax)
  
      res.render('index', {
        title: 'NodePop',
        adlist: allAds
      })
  } catch (err) {
      next(err)
  }
});

module.exports = router;
