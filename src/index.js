const path = require('path');

const express = require('express');
// const morgan = require('morgan')
const handlebars = require('express-handlebars');
const app = express();

const methodOverride = require('method-override')

const port = 3000;

const route = require('./routes');

const db = require('./config/db')

// Connect DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(express.json());

// app.use(morgan('combined'))

app.use(methodOverride('_method'))

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => {
                return a+b
            }
        }
    }),
);
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'resource', 'views'));
// console.log("Path: " + path.join(__dirname, 'resource/views'))

// Route init
        route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
