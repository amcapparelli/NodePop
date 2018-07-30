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
    const forsale = req.query.forsale
    const prodname = req.query.prodname
    
    if (tag){
      filter.tags = tag
    }
    if (prodname) {
      filter.productName = {$regex: "^" + prodname}
    }
    /* Extraigo de la base de datos los anuncios según los filtros y todos los tags disponibles */
    const allAds = await Ads.show(filter, limit, page, sort, priceMin, priceMax, forsale)
    const allTags = await Ads.distinct("tags")
  
    res.render('index', {
      title: 'NodePop',
      adlist: allAds, 
      tagsList: allTags
    })
    
  } catch (err) {
      next(err)
  }
});

module.exports = router;
