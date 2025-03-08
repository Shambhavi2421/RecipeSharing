const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name: {type:String, require:true},
    description: {type:String, require:true},
    ingredients: {type:String, require:true},
    steps: {type:String, require:true},
    time: {type:String, require:true},
    instruction: {type:String, require:true},
    photoUrl: {type:String, require:true}, // Image path
    userOwner: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true, },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
