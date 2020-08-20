const express = require('express')
const router = express.Router()
router.get('/login',(req,res) => {
    res.render('login')
})
//login頁面 from傳來的
router.get('/login',(req,res) => {
    console.log('login')
})
//註冊
router.get('/register',(req,res) => {
    res.render('register')
})
module.exports = router