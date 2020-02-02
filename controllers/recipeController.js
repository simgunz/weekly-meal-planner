const Recipe = require('../models/recipe');

exports.index = function(req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Recipes.
exports.recipe_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Recipe list');
};

// Display detail page for a specific Recipe.
exports.recipe_detail = function(req, res) {
  res.send(`NOT IMPLEMENTED: Recipe detail: ${req.params.id}`);
};

// Display Recipe create form on GET.
exports.recipe_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Recipe create GET');
};

// Handle Recipe create on POST.
exports.recipe_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Recipe create POST');
};

// Display Recipe delete form on GET.
exports.recipe_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Recipe delete GET');
};

// Handle Recipe delete on POST.
exports.recipe_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Recipe delete POST');
};

// Display Recipe update form on GET.
exports.recipe_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Recipe update GET');
};

// Handle recipe update on POST.
exports.recipe_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Recipe update POST');
};
