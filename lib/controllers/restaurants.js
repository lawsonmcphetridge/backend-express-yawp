const { Router } = require("express");
const { Restaurants } = require('../models/Restaurants');

module.exports = Router()
    .get('/', async (req, res, next) => {
        const listRestaurants = Restaurants.getAll();
        res.json(listRestaurants);
})



    ;