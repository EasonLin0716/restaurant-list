const express = require('express')
const router = express.Router()
// require restaurantList model
const Restaurants = require('../models/restaurantList')

// require authenticated from auth middleware
const { authenticated } = require('../config/auth')

// restaurants 首頁
router.get('/', authenticated, (req, res) => {
  console.log(req.query)
  // sortResult 用於存放透過req.query自index.handlebars下拉式選單中網址取得的值
  const sortResult = {}
  // e.g. sortResult = {}; sortResult = { name: 'asc' }
  sortResult[req.query.sortTarget] = req.query.sortType
  Restaurants.find({})
    // e.g. sort({})->什麼也不做; sort({ name: 'asc' })->依name升冪排序
    .sort(sortResult)
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restaurant })
    })
})

module.exports = router