const { Router } = require('express');
const { Restaurants } = require('../models/Restaurants');

module.exports = Router()
  .get('/', async (req, res) => {
    const listRestaurants = await Restaurants.getAll();
    res
      .json(listRestaurants)

      .get('/:id', async (req, res) => {
        const singleRest = await Restaurants.getById(req.params.id);
        res.json(singleRest);
      });
  });
