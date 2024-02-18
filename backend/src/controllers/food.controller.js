const catchAsync = require('../utils/catchAsync');
const Food = require('../models/food.model');
const User = require('../models/user.model');

const nutriscoreMap = {'a': 5, 'b': 4, 'c': 3, 'd': 2, 'e': 1};

const createFood = catchAsync(async (req, res) => {
  const { user, barcode, name, calories, score } = req.body;

  try {
    const food = await Food.create({ user: user, upc: barcode, name: name,
      calories: calories, score: score });
    updateUser(user, food);
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const viewFoodInfo = catchAsync(async (req, res) => {
  const { barcode } = req.params;

  try {
    fetch("https://world.openfoodfacts.net/api/v2/product/" + barcode, {
        method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const nova_db = 6 - data.product.nutriments["nova-group"];
          const nutri_db = nutriscoreMap[data.product.nutriscore_grade]
          const name_db = data.product.brands + ": " + data.product.product_name;
          const calories_db = data.product.nutriments["energy-kcal"];
          let name;
          let calories;
          let score;
          if (name_db) {
            name = nutri_db;
          } else {
            name = "Unknown"
          }
          if (calories_db) {
            calories = calories_db;
          } else {
            calories = 0;
          }
          if (nova_db && nutri_db) {
            score = nova_db * nutri_db / 2;
          } else {
            score = 0;
          }
          res.status(200).json({
            name: name,
            calories: calories,
            score: score
          });
        } else {
          res.status(400).json({ error: "Barcode Not Found In Database!" });
        }
      })
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
      const food = await Food.find({ user: user }).sort("-_id").limit(parseInt(n)).exec();
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

async function updateUser(userId, food) {
  const date = new Date();
  const month = date.getDate();
  const day = date.getDay();
  const year = date.getFullYear();
  const dateString = month + '-' + day + '-' + year;
  const user = await User.findOne({ _id: userId }).exec();
  const history = user.history;
  const dailyScores = history.filter((dailyScore) => dailyScore.date == dateString);
  if (dailyScores.length == 0) {
    await User.updateOne({ _id: userId }, { todayScore: food.score }).exec();
    await User.updateOne({ _id: userId }, { todayCalories: food.calories }).exec();
    history.push({
      date: dateString,
      score: food.score,
      calories: food.calories,
      food: [food._id]
    })
    await User.updateOne({ _id: userId }, { history: history }).exec();
  } else {
    const foods = dailyScores[0].food;
    let score = food.score;
    for (let i = 0; i < foods.length; i++) {
      const storedFood = await Food.findById(foods[i]).exec();
      score += storedFood.score;
    }
    score /= foods.length + 1;
    dailyScores[0].score = score;
    await User.updateOne({ _id: userId }, { todayScore: score }).exec();
    dailyScores[0].calories += food.calories;
    await User.updateOne({ _id: userId }, { todayCalories: food.calories }).exec();
    foods.push(food._id);
    await User.updateOne({ _id: userId }, { history: history }).exec();
  }
}

module.exports = {
  createFood,
  viewFoodInfo,
  getFood,
  getFoodByUser,
  deleteFood,
};