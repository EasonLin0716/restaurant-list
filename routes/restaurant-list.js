const express = require('express')
const router = express.Router()
// require restaurantList model
const Restaurants = require('../models/restaurantList')

const { authenticated } = require('../config/auth')

// 新增一筆 restaurant 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 顯示一筆 restaurant 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  // 先找出 _id 一樣的 restaurant, 並確保這筆 restaurant 屬於目前登入的 user
  Restaurants.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})

// 新增一筆 restaurant
router.post('/', authenticated, (req, res) => {
  console.log(req.body)

  if (!req.body.name || !req.body.image || !req.body.location || !req.body.phone || !req.body.description) {
    res.render('new')
  }

  // 建立 Restaurant model 實例
  const restaurants = new Restaurants({
    name: req.body.name, // 從 new 頁面 form 傳過來
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id
  })
  // 存入資料庫
  restaurants.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
})

// 修改 restaurant 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurants.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// 修改 restaurant
router.put('/:id', authenticated, (req, res) => {
  console.log(req.body)

  if (!req.body.name || !req.body.image || !req.body.location || !req.body.phone || !req.body.description) {
    res.render('edit')
  }

  Restaurants.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除 restaurants
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurants.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})



module.exports = router