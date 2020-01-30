var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe');

/* GET receips listing. */
router.get('/', function(req, res, next) {
  res.render('recipes', {title: 'Recipes', recipes: ['Hamburger', 'Patate']});
});

router.get('/create', function(req, res, next) {
  res.render('recipes-create', {title: 'Create Recipe'});
});

router.post('/create', function(req, res) {
  let newRecipe = Recipe(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
  });
});

module.exports = router;
