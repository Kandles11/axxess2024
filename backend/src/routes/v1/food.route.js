const express = require('express');
const foodController = require('../../controllers/food.controller');

const router = express.Router();

router.route('/').post(foodController.createFood);
router.route('/view/:barcode').get(foodController.viewFoodInfo);
router.route('/').get(foodController.getFood);
router.route('/user/:user').get(foodController.getFoodByUser);
router.route('/').delete(foodController.deleteFood);

module.exports = router;