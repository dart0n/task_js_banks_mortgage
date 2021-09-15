require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: process.env.HEROKU_APP_URL,
  optionsSuccessStatus: 200,
}

app.use(express.json({ extended: true }))
app.use(cors(process.env.NODE_ENV === 'production' ? corsOptions : { origin: true }))
app.options('*', cors())

app.use('/api/banks', require('./routers/banks.routes'))

if (process.env.NODE_ENV === 'production') {
  // serve react app
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 8000

async function start() {
  // start server after connecting to db
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(port, () => console.log(`App has been started on port ${port}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
