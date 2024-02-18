const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const foodSchema = mongoose.Schema({  
  upc: {
    type: String,
    required: false,
  },
  name:{
    type: String,
    required: false,
    trim: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  novaScore: {
    type: Number,
    required: false
  },
  nutritionScore: {
    type: Number,
    required: false
  },
  calories: {
    type: Number,
    required: false
  }
});

foodSchema.plugin(toJSON);
foodSchema.plugin(paginate);

const food = mongoose.model('food', foodSchema);
module.exports = food;