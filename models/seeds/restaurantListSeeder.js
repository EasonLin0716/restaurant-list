const mongoose = require('mongoose')
// require restaurantList.js data
const restaurantList = require('../restaurantList')
const User = require('../user')
const bcrypt = require('bcryptjs')

// setting connection to mongoDB
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

// require json data
const restaurantJson = require('./restaurant.json')
const userJson = require('./user.json')


db.once('open', () => {
  console.log('db connected!')
  // load json data into database
  User.create(userJson.results).then(() =>

    User.find({ email: 'user1@example.com' }, (err, user) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user[0].password, salt, (err, hash) => {
          if (err) throw err
          user[0].password = hash
          user[0].save()
        })
      })

      restaurantJson.results[0]["userId"] = user[0]._id.toString()
      restaurantJson.results[1]["userId"] = user[0]._id.toString()
      restaurantJson.results[2]["userId"] = user[0]._id.toString()
    })

  ).then(() =>

    User.find({ email: 'user2@example.com' }, (err, user) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user[0].password, salt, (err, hash) => {
          if (err) throw err
          user[0].password = hash
          user[0].save()
        })
      })

      restaurantJson.results[3]["userId"] = user[0]._id.toString()
      restaurantJson.results[4]["userId"] = user[0]._id.toString()
      restaurantJson.results[5]["userId"] = user[0]._id.toString()
    })

  ).then(() =>

    restaurantList.create(restaurantJson.results)

  )

  console.log('Data create complete!')
})