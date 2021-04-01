const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    total_cart_price: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now()
    },
    delivery_date: {
        type: Date,
        required: true
    },
    payment_details: {
        type: String,
        required: true
    }
})

const OrderModel = model('order', OrderSchema)

module.exports = { OrderModel }
