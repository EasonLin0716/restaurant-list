const express = require('express')
const router = express.Router()
const passport = require('passport')
// require bcrypt library
const bcrypt = require('bcryptjs')
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

  // 加入錯誤訊息提示
  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: '必須填上email和密碼' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {

    User.findOne({ email: email }).then(user => {
      if (user) {
        // 使用者已經註冊過
        errors.push({ message: '這個 Email 已經註冊過了' })
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

        // generate salt, complex use default 10
        bcrypt.genSalt(10, (err, salt) =>
          // combine user password with salt, output hashed hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            // save user after password is handled by bcrypt
            newUser
              .save()
              .then(user => {
                res.redirect('/') // 完成後重新導向至首頁
              }).catch(err => console.log(err))
            // 新增完成後導回首頁
          })
        )
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})


module.exports = router