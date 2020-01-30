var express = require('express');
var router = express.Router();

/* GET receips listing. */
router.get('/', function(req, res, next) {
  res.render('recipes', {title: 'Recipes', recipes: ['Hamburger', 'Patate']});
});

module.exports = router;
