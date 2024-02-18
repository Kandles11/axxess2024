const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/').get(userController.getUsers);
router.route('/:userId').get(userController.getUser)
router.route('/:userId').patch(userController.updateUser)
router.route('/:userId').delete(userController.deleteUser);
//router.route('/leaderboard').get(userController.getLeaderboard);

module.exports = router;