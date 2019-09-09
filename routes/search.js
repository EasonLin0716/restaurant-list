const express = require('express')
const router = express.Router()
// require restaurantList model
const Restaurants = require('../models/restaurantList')

// 搜尋一筆 restaurant
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const regex = new RegExp(keyword, 'gi')

  const sortResult = {}
  sortResult[req.query.sortTarget] = req.query.sortType

  Restaurants.find((err, restaurants) => {
    if (err) return console.log(err)

    // return search result
    const searchResult = restaurants.filter(restaurant => {
      return restaurant.name.match(regex) || restaurant.category.match(regex) || restaurant.location.match(regex)
    })

    console.log(searchResult)
    // keyword will be rendered if user searched, which means user can sort after searching
    return res.render('index', { restaurant: searchResult, keyword })
  })
})


module.exports = router