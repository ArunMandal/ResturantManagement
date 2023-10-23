const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authMiddleware } = require('../controllers/userController');


router.use(authMiddleware);
router.post('/', restaurantController.createRestaurant);

router.get('/:restaurantId', restaurantController.getRestaurantById);

router.get('/', restaurantController.listRestaurants);
router.put('/:restaurantId/foods', restaurantController.addFood);
router.put('/:restaurantId/notes', restaurantController.addNote);
router.patch('/:restaurantId/foods/:foodId', restaurantController.updateFood);
router.patch('/:restaurantId/foods/:noteId', restaurantController.updateNote);

router.put('/:restaurantId/orders', restaurantController.addOrder);
router.patch('/addToCart/:restaurantId/addToCart/:foodId', restaurantController.addToCart);

// Checkout the cart
router.put('/checkoutCart/:restaurantId/checkoutCart/:foodId', restaurantController.checkoutCart);



module.exports = router;

