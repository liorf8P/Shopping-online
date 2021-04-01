// imports
const express = require('express')
const cors = require('cors')
const { connectToMongo } = require('./db')

// config the env variables
require('dotenv').config()

//setup
const app = express()
connectToMongo()

//midllewares
app.use(cors())
app.use(express.json())
app.use('/users', require('./routes/users.route'))
app.use('/categories', require('./routes/categories.route'))
app.use('/items', require('./routes/items.route'))
app.use('/carts', require('./routes/carts.route'))
app.use('/cartitems', require('./routes/cartitems.route'))
app.use('/orders', require('./routes/orders.route'))

app.listen(1000, () => console.log('server is running on port 1000'))
