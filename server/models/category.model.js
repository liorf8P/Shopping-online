const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required:true,
        unique:true
    }
})

const CategoryModel = model('category', categorySchema)

module.exports = { CategoryModel }

