const path = require('path')

const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))


app.use(morgan('combined'))

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'))
// console.log("Path: " + path.join(__dirname, 'resource/views'))

app.get('/', (req, res) => {
   res.render('home');
})

app.get('/login', function(req, res) {
  res.render('login')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
