var express = require('express');
var router = express.Router();
const Ads = require('../lib/createModels')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const allAds = await Ads.find()
    const adsToShow = allAds.map(item =>  item.productName + ' ' + item.price )  
      res.render('index', {
        title: 'NodePop',
        adlist: adsToShow
      })
  } catch (err) {
      next(err)
  }
  
});

module.exports = router;
