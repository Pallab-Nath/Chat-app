const express = require('express')
require('dotenv').config()
const app = express()
const server = require('http').createServer(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})