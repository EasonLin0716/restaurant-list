/* ---------- 基本設定 ---------- */
const express = require('express')
const app = express()
const port = 3000
// 將public資料夾設定為靜態檔案
app.use(express.static('public'))


/* ---------- 載入中介軟體 ---------- */
// express handlebars here
const exphbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// layout's handlebars would have to be named as 'main.handlebars'
app.set('view engine', 'handlebars')

// require body-parser
const bodyParser = require('body-parser');
// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));


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
const Restaurants = require('./models/restaurantList')


/* ---------- 設定路由 ---------- */
app.use('/', require('./routes/homes'))
app.use('/restaurants', require('./routes/restaurant-list'))
app.use('/search', require('./routes/search'))




/* ---------- 連線監聽 ---------- */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})