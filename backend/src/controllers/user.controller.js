const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');

const createUser = catchAsync(async (req, res) => {
  const { name } = req.params;

  try {
    const user = await User.create({ name, todayScore: 0, history: [] });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { todayScore, history } = req.body;

  const update = { todayScore, history };

  try {
    const user = await User.updateOne({_id: userId}, update).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId }).exec();
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
  const { userId } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: userId }).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
          if (arr[j].todayScore < arr[j + 1].todayScore) {
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
  const { n } = req.params;

  try {
    const users = await User.find({}).exec();
    if (n) {
      const sortedUsers = bubbleSort(users);
      res.status(200).json(sortedUsers.slice(0, parseInt(n)));
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getLeaderboard,
};
