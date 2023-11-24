const express = require('express')
const path = require('path')
const ejs = require('ejs')
require('dotenv').config()
const app = express()
const server = require('http').createServer(app)
const {loginfunc ,signupfunc } = require('./utils/signup')

const PORT = process.env.PORT || 5000
const publicDir = path.join(__dirname,'./public')

console.log(publicDir)
app.set('view engine','ejs')

app.use(express.static(publicDir))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.render('login')
})

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post('/login',loginfunc)

app.post('/signup',signupfunc)
// Socket 
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})