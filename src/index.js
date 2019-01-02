require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT

const chats = []

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Zac chat!'))

app.get('/chats', (req, res, next) => {
  res.send(chats)
})

app.post('/chat', (req, res, next) => {

  const chat = req.body

  chats.push(chat)

  res.send(chat)

})

app.listen(port, () => console.log(`Zac-chat API server listening on port ${port}!`))
