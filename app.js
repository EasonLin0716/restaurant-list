// require express
const express = require('express')
const app = express()
const port = 3000


// express handlebars here
const exphbs = require('express-handlebars')
// require restaurant data here
const restaurantList = require('./restaurant.json')


// load in mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true }) // setting connection to mongoDB
// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection


// connecting error
db.on('error', () => {
  console.log('mongodb error!')
})

// connecting successful
db.once('open', () => {
  console.log('mongodb connected!')
})


// require restaurantList model
const RestaurantList = require('./models/restaurantList')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// layout's handlebars would have to be named as 'main.handlebars'
app.set('view engine', 'handlebars')


// 將public資料夾設定為靜態檔案
app.use(express.static('public'))


app.get('/', (req, res) => {
  // '/' will render index.handlebars
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = new RegExp(req.query.keyword, 'ig')
  const restaurantResult = restaurantList.results.filter(restaurant => {
    return restaurant.name.match(keyword) || restaurant.location.match(keyword) || restaurant.category.match(keyword)
  })
  res.render('index', { restaurant: restaurantResult })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})