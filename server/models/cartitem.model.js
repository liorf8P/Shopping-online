const { Schema, model } = require('mongoose')

const CartitemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    total_item_price: {
        type: Number,
        required: true
    }
})

const CartItemModel = model('cartitem', CartitemSchema)

module.exports = { CartItemModel }
