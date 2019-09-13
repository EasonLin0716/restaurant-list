/* ---------- 基本設定 ---------- */
const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))


/* ---------- 載入中介軟體 ---------- */
// require express handlebars
const exphbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// layout's handlebars would have to be named as 'main.handlebars'
app.set('view engine', 'handlebars')

// require body-parser
const bodyParser = require('body-parser');
// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// require method-override
const methodOverride = require('method-override')
// setting method-override
app.use(methodOverride('_method'))

// require express-session
const session = require('express-session')
// register express-session and set
app.use(session({
  secret: 'your secret key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true
}))

// require passport
const passport = require('passport')
// use passport
app.use(passport.initialize())
app.use(passport.session())
// load passport config
require('./config/passport')(passport)
// when log in we can get user info to use in view
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})


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
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant-list'))
app.use('/search', require('./routes/search'))
app.use('/users', require('./routes/users'))


/* ---------- 連線監聽 ---------- */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})