// config/passport.js
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
// require bcrypt
const bcrypt = require('bcryptjs')
// require User model
const User = require('../models/user')

module.exports = passport => {
  // Use passport official site syntax
  passport.use( // Define usernameField as email
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered.' })
        }

        // use bcrypt to compare user's typed password is equal to db's password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Email or Password incorrect' })
          }
        })

        // if (user.password != password) {
        //   return done(null, false, { message: 'Email or password incorrect.' })
        // }
        // return done(null, user)
      })
    })
  )

  // serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}