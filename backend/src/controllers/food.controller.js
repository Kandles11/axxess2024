const catchAsync = require('../utils/catchAsync');

const Food = require('../models/food.model');

// Servings: Float, 

const createFood = catchAsync(async (req, res) => {
  const { user, foodName, upc, serving, calories, novaScore, nutritionScore } = req.body;

  try {
    const food = await Food.create({ user, foodName, upc, serving, calories, novaScore, nutritionScore }).exec();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updateFood = catchAsync(async (req, res) => {
  const { mongoId, serving } = req.body;

  const filter = { mongoId };
  const update = { serving };

  try {
    const food = await Food.findByIdAndUpdate(filter, update, { new: true }).exec();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getFood = catchAsync(async (req, res) => {
  const { mongoId } = req.body;

  try {
    const food = await Food.findById({ mongoId }).exec();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const deleteFood = catchAsync(async (req, res) => {
  const { mongoId } = req.body;

  try {
    const food = await Food.findByIdAndDelete({ mongoId }).exec();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  createFood,
  updateFood,
  getFood,
  deleteFood,
};