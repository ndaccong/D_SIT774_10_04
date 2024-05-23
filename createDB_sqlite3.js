const path = require('path')
const UserData = require(path.join(__dirname, 'data/users'));
const ProductData = require(path.join(__dirname, 'data/products'));
const EnquiryData = require(path.join(__dirname, 'data/enquiries'));

var sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)

db.serialize(function () {
    db.run('DROP TABLE IF EXISTS users;')
    db.run('DROP TABLE IF EXISTS products;')
    db.run('DROP TABLE IF EXISTS enquiries;')
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);')
    db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, image_link TEXT, price DECIMAL);')
    db.run('CREATE TABLE IF NOT EXISTS enquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, enquiry TEXT);')
})

// To insert data
for (let i = 0; i < UserData.users.length; i++) {
  db.run('INSERT INTO users (username, password) VALUES (?,?)', [UserData.users[i].username, UserData.users[i].password])
}
for (let i = 0; i < ProductData.products.length; i++) {
    db.run('INSERT INTO products (name, description, image_link, price) VALUES (?,?,?,?)', [ProductData.products[i].name, ProductData.products[i].description, ProductData.products[i].image_link, ProductData.products[i].price])
}
for (let i = 0; i < EnquiryData.enquiries.length; i++) {
    db.run('INSERT INTO enquiries (name, email, phone, enquiry) VALUES (?,?,?,?)', [EnquiryData.enquiries[i].name, EnquiryData.enquiries[i].email, EnquiryData.enquiries[i].phone, EnquiryData.enquiries[i].enquiry])
}