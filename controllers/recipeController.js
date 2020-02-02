const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const async = require('async');

const Recipe = require('../models/recipe');

const categories = ['Pollo', 'Carne', 'Pesce'];
const courses = ['Primo', 'Secondo', 'Contorno'];

exports.index = function(req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Recipes.
exports.recipe_list = function(req, res, next) {
  async.parallel(
    {
      seconds(callback) {
        Recipe.find({ course: 'Secondo' }, callback);
      },
      sides(callback) {
        Recipe.find({ course: 'Contorno' }, callback);
      },
    },
    function(err, results) {
      if (err) return next(err);
      res.render('recipes', {
        seconds: results.seconds,
        sides: results.sides,
      });
    }
  );
};

// Display detail page for a specific Recipe.
exports.recipe_detail = function(req, res) {
  Recipe.findById(req.params.id)
    .populate('servedWith')
    .exec(function(err, results) {
      if (err) throw err;
      res.render('recipe', { recipe: results });
    });
};

// Display Recipe create form on GET.
exports.recipe_create_get = function(req, res, next) {
  Recipe.find({}, 'name').exec(function(err, recipes) {
    if (err) {
      return next(err);
    }
    // Successful, so render.
    res.render('recipe_form', {
      title: 'Create Recipe',
      recipe_list: recipes,
      courses,
      categories,
    });
  });
};

// Handle Recipe create on POST.
exports.recipe_create_post = [
  (req, res, next) => {
    if (!(req.body.servedWith instanceof Array)) {
      if (typeof req.body.servedWith === 'undefined') req.body.servedWith = [];
      else req.body.servedWith = new Array(req.body.servedWith);
    }
    next();
  },
  // Validate that the name field is not empty.
  body('name', 'Recipe name required')
    .isLength({ min: 1 })
    .trim(),
  // Sanitize (escape) the name field.
  sanitizeBody('name').escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const recipe = new Recipe({
      name: req.body.name,
      servings: req.body.servings,
      course: req.body.course,
      category: req.body.category,
      servedWith: req.body.servedWith,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      Recipe.find({}, 'name').exec(function(err, recipes) {
        if (err) {
          return next(err);
        }
        res.render('recipe_form', {
          title: 'Create Recipe',
          recipe_list: recipes,
          categories: foodCategories,
          recipe: req.body,
          errors: errors.array(),
        });
      });
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Recipe.findOne({ name: req.body.name }).exec(function(err, foundRecipe) {
        if (err) {
          return next(err);
        }

        if (foundRecipe) {
          // Recipe exists, redirect to its detail page.
          res.redirect(foundRecipe.url);
        } else {
          recipe.save(function(err) {
            if (err) {
              return next(err);
            }
            // Genre saved. Redirect to genre detail page.
            res.redirect(recipe.url);
          });
        }
      });
    }
  },
];

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
