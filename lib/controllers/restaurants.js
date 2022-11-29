const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Restaurants } = require('../models/Restaurants');
const { Reviews } = require('../models/Reviews');

module.exports = Router()
  .get('/', async (req, res) => {
    const listRestaurants = await Restaurants.getAll();
    res.json(listRestaurants);
  })

  .get('/:id', async (req, res) => {
    const singleRest = await Restaurants.getById(req.params.id);
    await singleRest.addReviews();
    res.json(singleRest);
  })

  .post('/:id/reviews', authenticate, async (req, res) => {
    const review = await Reviews.insertReview({
      detail: req.body.detail,
      restaurantId: req.params.id,
      stars: 5,
      userId: req.user.id,
    });
    res.json(review);
  });
