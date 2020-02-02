const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: String,
  servings: Number,
  course: String,
  category: String,
  servedWith: { type: Schema.Types.ObjectId, ref: 'Recipe', required: false },
  ingredients: [String],
  instructions: String,
});

RecipeSchema.virtual('url').get(function() {
  return `/recipe/${this._id}`;
});

// mongoose.model('Recipe', RecipeSchema);
module.exports = mongoose.model('Recipe', RecipeSchema);
