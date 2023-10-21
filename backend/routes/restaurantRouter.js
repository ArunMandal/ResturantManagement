const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authMiddleware } = require('../controllers/userController');


//router.use(authMiddleware);
router.post('/', restaurantController.createRestaurant);

router.get('/:restaurantId', restaurantController.getRestaurantById);

router.get('/', restaurantController.listRestaurants);
router.post('/:restaurantId/foods', restaurantController.addFood);
router.put('/:restaurantId/notes', restaurantController.addNote);
router.patch('/:restaurantId/foods/:foodId', restaurantController.updateFood);
router.delete('/:restaurantId/foods/:foodId', restaurantController.deleteFood);
router.patch('/:restaurantId/foods/:noteId', restaurantController.updateNote);

module.exports = router;

