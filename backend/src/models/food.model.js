const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const foodSchema = mongoose.Schema({  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  upc: {
    type: String,
    required: false,
  },
  name: {
    type: Number,
    required: false
  },
  calories: {
    type: Number,
    required: false
  },
  score: {
    type: Number,
    required: false
  }
});

foodSchema.plugin(toJSON);
foodSchema.plugin(paginate);

const food = mongoose.model('food', foodSchema);
module.exports = food;