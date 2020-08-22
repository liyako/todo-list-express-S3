const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const {authenticator} = require('../middleware/auth')//掛載 middleware

router.use('/todos',authenticator, todos)
router.use('/users', users)
router.use('/',authenticator, home)// 加入驗證程序,定義寬鬆的路由引到清單最下方

module.exports = router
