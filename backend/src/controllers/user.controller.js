const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');

const createUser = catchAsync(async (req, res) => {
  const { name, score } = req.body;

  try {
    const user = await User.create({ name, score });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updateUser = catchAsync(async (req, res) => {
  const { name, score } = req.body;

  const filter = { name };
  const update = { score };

  try {
    const user = await User.findOneAndUpdate(filter, update, { new: true }).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId }).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const deleteUser = catchAsync(async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findOneAndDelete({ name }).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
          if (arr[j].score > arr[j + 1].score) {
              // Swapping the elements
              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
          }
      }
  }
  return arr;
}

const getLeaderboard = catchAsync(async (req, res) => {
  userArray = bubbleSort(userArray);
  return userArray
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
