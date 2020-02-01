const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: String,
  text: String,
});

mongoose.model('Recipe', RecipeSchema);

