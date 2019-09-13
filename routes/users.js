const express = require('express')
const router = express.Router()
const passport = require('passport')
// require user model
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { // 使用 passport 認證
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      // 使用者已經註冊過
      console.log('user already exist')
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      // 如果 email 不存在就新增使用者
      const newUser = new User({
        name,
        email,
        password
      })
      newUser
        .save()
        .then(user => {
          res.redirect('/') // 完成後重新導向至首頁
        }).catch(err => console.log(err))
      // 新增完成後導回首頁
    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})


module.exports = router