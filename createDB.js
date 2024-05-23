const path = require('path')
const UserData = require(path.join(__dirname, 'data/users_hashed'));
const ProductData = require(path.join(__dirname, 'data/products'));
const EnquiryData = require(path.join(__dirname, 'data/enquiries'));

const Database = require('better-sqlite3')
var db = new Database('new_data.db')

db.pragma('journal_mode = WAL');


// Set up tables
db.prepare('DROP TABLE IF EXISTS users;').run()
db.prepare('DROP TABLE IF EXISTS products;').run()
db.prepare('DROP TABLE IF EXISTS enquiries;').run()
db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);').run()
db.prepare('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, image_link TEXT, price DECIMAL);').run()
db.prepare('CREATE TABLE IF NOT EXISTS enquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, enquiry TEXT);').run()

// To insert data
for (let i = 0; i < UserData.users.length; i++) {
  db.prepare('INSERT INTO users (username, password) VALUES (?,?)').run([UserData.users[i].username, UserData.users[i].password])
}
for (let i = 0; i < ProductData.products.length; i++) {
    db.prepare('INSERT INTO products (name, description, image_link, price) VALUES (?,?,?,?)').run([ProductData.products[i].name, ProductData.products[i].description, ProductData.products[i].image_link, ProductData.products[i].price])
}
for (let i = 0; i < EnquiryData.enquiries.length; i++) {
    db.prepare('INSERT INTO enquiries (name, email, phone, enquiry) VALUES (?,?,?,?)').run([EnquiryData.enquiries[i].name, EnquiryData.enquiries[i].email, EnquiryData.enquiries[i].phone, EnquiryData.enquiries[i].enquiry])
}