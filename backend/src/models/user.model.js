const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    todayScore: {
      type: Number,
      required: true,
    },
    history: {
      dailyScore: {
        date: {
          type: Date,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        calories: {
          type: Number,
          required: true,
        },
        food: {
          foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
          type: Array,
          required: true,
        },
        type: Object,
        required: false,
      },
      type: Array,
      required: true,
    },
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);
module.exports = User;
