/* ---------- 基本設定 ---------- */
const express = require('express')
const app = express()
const port = 3000
// require restaurant data here
const restaurantList = require('./restaurant.json')
// 將public資料夾設定為靜態檔案
app.use(express.static('public'))


/* ---------- 載入中介軟體 ---------- */
// express handlebars here
const exphbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// layout's handlebars would have to be named as 'main.handlebars'
app.set('view engine', 'handlebars')


/* ---------- 載入資料庫 ---------- */
// load in mongoose
const mongoose = require('mongoose')
// setting connection to mongoDB
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true })
// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection
// db connecting error
db.on('error', () => {
  console.log('mongodb error!')
})
// db connecting successful
db.once('open', () => {
  console.log('mongodb connected!')
})
// require restaurantList model
const RestaurantList = require('./models/restaurantList')


/* ---------- 設定路由 ---------- */
// restaurants 首頁
app.get('/', (req, res) => {
  // '/' will render index.handlebars
  res.render('index', { restaurant: restaurantList.results })
})

// 列出全部 restaurants
app.get('/restaurants', (req, res) => {
  res.send('列出所有 restaurants')
})

// 新增一筆 restaurant 頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增 restaurant 頁面')
})

// 顯示一筆 restaurant 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// 新增一筆 restaurant
app.post('/restaurants', (req, res) => {
  res.send('建立 restaurant')
})

// 修改 restaurant 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改 restaurant 頁面')
})

// 修改 restaurant
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('修改 restaurant')
})

// 刪除 restaurants
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除 restaurant')
})

// 搜尋一筆 restaurant
app.get('/search', (req, res) => {
  const keyword = new RegExp(req.query.keyword, 'ig')
  const restaurantResult = restaurantList.results.filter(restaurant => {
    return restaurant.name.match(keyword) || restaurant.location.match(keyword) || restaurant.category.match(keyword)
  })
  res.render('index', { restaurant: restaurantResult })
})


/* ---------- 連線監聽 ---------- */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})