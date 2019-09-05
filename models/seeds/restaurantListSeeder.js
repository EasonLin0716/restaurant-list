const mongoose = require('mongoose')
// require restaurantList.js data
const restaurantList = require('../restaurantList')

// setting connection to mongoDB
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true })


const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

// require json data
const restaurantJson = require('./restaurant.json')


db.once('open', () => {
  console.log('db connected!')
  // load json data into database
  restaurantList.create(restaurantJson.results)
  console.log('Data create complete!')
})