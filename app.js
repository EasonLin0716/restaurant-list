// require express
const express = require('express')
const app = express()
const port = 3000

// express handlebars here
const exphbs = require('express-handlebars')
// require restaurant data here
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// layout's handlebars would have to be named as 'main.handlebars'
app.set('view engine', 'handlebars')

// 將public資料夾設定為靜態檔案
app.use(express.static('public'))

app.get('/', (req, res) => {
  // render:渲染，解析 HTML 樣板並繪製出瀏覽器裡的畫面，回傳 HTML 來呈現前端樣板
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  console.log(restaurant)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  const restaurantResult = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurantResult })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})