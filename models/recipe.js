const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: String,
  servings: Number,
  course: String,
  category: String,
  served_with: { type: Schema.Types.ObjectId, ref: 'Recipe', required: false },
  ingredients: [String],
  instructions: String,
});

RecipeSchema.virtual('url').get(function() {
  return `/recipe/${this._id}`;
});

mongoose.model('Recipe', RecipeSchema);
