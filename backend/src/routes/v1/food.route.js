const express = require('express');
const foodController = require('../../controllers/food.controller');

const router = express.Router();

router.route('/').post(foodController.createFood);
router.route('/').patch(foodController.updateFood);
router.route('/').get(foodController.getFood);
router.route('/').delete(foodController.deleteFood);