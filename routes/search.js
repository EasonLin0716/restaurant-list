const express = require('express')
const router = express.Router()
// require restaurantList model
const Restaurants = require('../models/restaurantList')

// 搜尋一筆 restaurant
router.get('/', (req, res) => {
  const regex = new RegExp(req.query.keyword, 'gi')
  Restaurants.find((err, restaurants) => {
    if (err) return console.log(err)
    const restaurantResult = restaurants.filter(restaurant => {
      return restaurant.name.match(regex) || restaurant.category.match(regex) || restaurant.location.match(regex)
    })
    console.log(restaurantResult)
    return res.render('index', { restaurant: restaurantResult })
  })
})


module.exports = router