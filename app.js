const express = require('express')//功能極簡的路由與中介軟體 Web 架構
const session = require('express-session')//在 express使用第三方 模組
const exphbs = require('express-handlebars')//跟express框架搭配的module，是一個樣版引擎
const bodyParser = require('body-parser')//攔截和解析所有的請求
const methodOverride = require('method-override')//method-override將GET或者POST改成其他謂詞PUT ,DELETE等
const flash = require('connect-flash')//會話中用於存儲消息的特殊區域

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()//環境變數
}

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

//hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//登入session模組
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized:true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// 呼叫 Passport 函式並傳入 app
usePassport(app)

//flash提示視窗
app.use(flash())
//middleware驗證
app.use((req,res,next) => {
  //console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')//succes_msg flash msg
  res.locals.warning_msg = req.flash('warning_msg')//warning_msg flash msg
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
