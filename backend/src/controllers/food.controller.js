const catchAsync = require('../utils/catchAsync');
const Food = require('../models/food.model');

const nutriscoreMap = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5};

const createFood = catchAsync(async (req, res) => {
  const { user, barcode, servings } = req.body;

  try {
    fetch("https://world.openfoodfacts.net/api/v2/product/".concat(barcode), {
        method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        const food = Food.create({ user: user, name: data.product.product_name, 
          upc: barcode, servings: servings, calories: data.product.nutriments["energy-kcal"], 
          novaScore: data.product.nutriments["nova-group"],
          nutritionScore: nutriscoreMap[data.product.nutriscore_grade] });
        res.status(200).json(food);
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updateFood = catchAsync(async (req, res) => {
  const { mongoId, servings } = req.body;

  const filter = { mongoId };
  const update = { servings };

  try {
    const food = await Food.findByIdAndUpdate(filter, update, { new: true }).exec();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getFood = catchAsync(async (req, res) => {
  const { mongoId } = req.params;

  try {
    const food = await Food.findById({ mongoId }).exec();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getFoodByUser = catchAsync(async (req, res) => {
  const { user } = req.params;
  const { n } = req.query;

  try {
    if (n) {
      const food = await Food.find({ user: user }).limit(parseInt(n)).exec();
      res.status(200).json(food);
    } else {
      const food = await Food.find({ user: user }).exec();
      res.status(200).json(food);
    }
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
  getFoodByUser,
  deleteFood,
};