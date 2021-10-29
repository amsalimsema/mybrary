if (process.env.NODE_ENV == 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.use('/', indexRouter)

app.listen(process.env.PORT || 5000)
