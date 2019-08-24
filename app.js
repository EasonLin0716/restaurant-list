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

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id.toString() === req.params.id)
  console.log(restaurant)
  res.render('show', { restaurant: restaurant[0] })
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