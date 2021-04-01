const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

const ItemModel = model('item', itemSchema)

module.exports = { ItemModel }
