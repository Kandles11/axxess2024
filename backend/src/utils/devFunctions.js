const FoodController = require('../controllers/food.controller');

async function resetUserHistory(userId) {
    fetch("http://localhost:3000/v1/food/user/" + userId, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            FoodController.updateUser(userId, data[i]);
        }
    })
}

module.exports = {
    resetUserHistory,
};