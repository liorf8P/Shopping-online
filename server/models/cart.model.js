const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now()
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

const CartModel = model('cart', cartSchema)

module.exports = { CartModel }
