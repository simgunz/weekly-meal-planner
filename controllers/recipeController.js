const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const async = require('async');

const Recipe = require('../models/recipe');

const categories = ['Pollo', 'Carne', 'Pesce'];
const courses = ['Secondo', 'Contorno'];

exports.index = function(req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Convert undefined or string to array
function toArray(values) {
  if (values instanceof Array) {
    return values;
  }
  if (typeof values === 'undefined') {
    return [];
  }
  return Array(values);
}

// Display list of all Recipes.
exports.recipe_list = function(req, res, next) {
  Recipe.aggregate([
    { $unwind: '$course' },
    {
      $group: {
        _id: '$course',
        recipes: {
          $push: {
            name: '$name',
            url: { $concat: ['/recipe/', { $toString: '$_id' }] },
          },
        },
      },
    },
  ]).exec(function(err, results) {
    if (err) return next(err);
    res.render('recipes', {
      courses: results,
    });
  });
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
    req.body.servedWith = toArray(req.body.servedWith);
    req.body.ingredients = toArray(req.body.ingredients);
    next();
  },
  // Validate fields
  body('name', 'Recipe name required')
    .isLength({ min: 1 })
    .trim()
    .withMessage('The recipe name must be specified.')
    .custom(name =>
      Recipe.findOne({ name })
        .exec()
        .then(foundRecipe => {
          if (foundRecipe) {
            return Promise.reject(
              new Error('A recipe with the same name already exists.')
            );
          }
        })
    ),
  body('servings')
    .isNumeric()
    .withMessage('The number of servings must be specified.'),
  body('ingredients')
    .isArray()
    .withMessage('Ingredients must be an array.')
    .custom(ingredients => ingredients.length > 0)
    .withMessage('At least one ingredient must be provided.'),
  body('instructions').trim(),

  // Sanitize fields
  sanitizeBody('name').escape(),
  sanitizeBody('ingredients.*').escape(),
  sanitizeBody('instructions').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      Recipe.find({}, 'name').exec(function(err, recipes) {
        if (err) {
          return next(err);
        }
        res.render('recipe_form', {
          title: 'Create Recipe',
          recipe_list: recipes,
          courses,
          categories,
          recipe: req.body,
          errors: errors.array(),
        });
      });
    } else {
      // Data from form is valid.

      // Create a Recipe object with escaped and trimmed data.
      const recipe = new Recipe({
        name: req.body.name,
        servings: req.body.servings,
        course: req.body.course,
        category: req.body.category,
        servedWith: req.body.servedWith,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
      });

      recipe.save(function(err) {
        if (err) {
          return next(err);
        }
        // Recipe saved. Redirect to recipe detail page.
        res.redirect(recipe.url);
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
