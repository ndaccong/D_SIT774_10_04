// Require the express web application framework (https://expressjs.com)
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

// Create a new web application by calling the express function
const app = express()
const port = 3000

app.use(morgan('common'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// let db = new sqlite3.Database('./data.db')
const Database = require('better-sqlite3')
var db = new Database('new_data.db')

db.pragma('journal_mode = WAL');

var isLoggedIn = false
var username = ''
const defaultViewOption = 'grid'
const defaultPrice = 30
var viewOption = defaultViewOption
var price = defaultPrice

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Four Aces Shop',
    isLoggedIn: isLoggedIn,
    username: username
  })
})

app.get('/home', (req, res) => {
  res.render('index', {
    title: 'Four Aces Shop',
    isLoggedIn: isLoggedIn,
    username: username
  })
})

app.get('/about_us', (req, res) => {
  res.render('about_us', {
    title: 'About Us',
    isLoggedIn: isLoggedIn,
    username: username
  })
})

app.get('/products', (req, res) => {
  var sql = `SELECT * FROM products`
  rows = db.prepare(sql).all()
  res.render('products', {
    title: 'Products',
    isLoggedIn: isLoggedIn,
    username: username,
    data: rows,
    priceValue: price,
    viewOption: viewOption
  })
})

app.get('/contact_us', (req, res) => {
  res.render('contact_us', {
    title: 'Contact Us',
    isLoggedIn: isLoggedIn,
    username: username
  })
})

app.get('/blog', (req, res) => {
  res.render('blog', {
    title: 'Blog',
    isLoggedIn: isLoggedIn,
    username: username
  })
})

app.get('/viewenquiry', (req, res) => {
  var sql = 'SELECT * FROM enquiries'
  rows = db.prepare(sql).all()
  res.render('viewenquiry', {
    title: 'Enquiries',
    isLoggedIn: isLoggedIn,
    username: username,
    data: rows
  })
})

app.post('/login', (req, res) => {
  var sql = `SELECT COUNT(1) AS count FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}';`
  console.log(sql)
  rows = db.prepare(sql).get()
  if (rows.count > 0) {
    isLoggedIn = true
    username = req.body.username
    res.render('index', {
      title: 'Four Aces Shop',
      isLoggedIn: isLoggedIn,
      username: req.body.username
    })
  }
  else {
    res.render('index', {
      title: 'Four Aces Shop',
      isLoggedIn: isLoggedIn
    })
  }
})

app.post('/enquiry', (req, res) => {
  var sql = `INSERT OR IGNORE INTO enquiries (name, email, phone, enquiry) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.enquiry}');`
  db.prepare(sql).run()
})

app.post('/logout', (req, res) => {
  isLoggedIn = false
  res.render('index', {
    title: 'Four Aces Shop',
    isLoggedIn: isLoggedIn
  })
})

app.post('/search', (req, res) => {
  if (!req.body.priceFilter) {
    price = defaultPrice
  }
  else {
    price = req.body.priceFilter
  }
  var sql = `SELECT * FROM products 
    WHERE (price < ${price})
      AND (name LIKE '%${req.body.searchText}%' OR description LIKE '%${req.body.searchText}%');`
  console.log(sql)
  rows = db.prepare(sql).all()
  res.render('products', {
    title: 'Products',
    isLoggedIn: isLoggedIn,
    data: rows,
    priceValue: price,
    username: username,
    viewOption: viewOption
  })
})

app.post('/filter', (req, res) => {
  viewOption = req.body.viewOption
  if (!req.body.searchText) {
    var searchText = ''
  }
  else {
    var searchText = req.body.searchText
  }
  if (!req.body.priceFilter) {
    price = defaultPrice
  }
  else {
    price = req.body.priceFilter
  }
  var sql = `SELECT * FROM products 
    WHERE (price < ${price})
      AND (name LIKE '%${searchText}%' OR description LIKE '%${searchText}%');`
  console.log(sql)
  console.log(req.body.searchText)
  rows = db.prepare(sql).all()
  res.render('products', {
    title: 'Products',
    isLoggedIn: isLoggedIn,
    data: rows,
    priceValue: price,
    username: username,
    viewOption: viewOption
  })
})


// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, ()=> {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000. Print another message indicating
  // how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`)
  console.log(`Type Ctrl+C to shut down the web server`)
})
