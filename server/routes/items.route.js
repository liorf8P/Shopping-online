const router = require('express').Router()
const { ItemModel } = require('../models/item.model')

//get all products
router.get('/', async (req, res) => {
    try {
        const products = await ItemModel.find().populate('category')
        res.json({ error: false, products })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//get products by category
router.get('/:cat', async (req, res) => {
    try {
        const products = await ItemModel.find({ category: `${req.params.cat}` }).populate('category')
        res.json({ error: false, products })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//get product by name
router.get('/name/:name', async (req, res) => {
    try {
        const products = await ItemModel.find({ name: `${req.params.name}` }).populate('category')
        res.json({ error: false, products })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//get product by id
router.get('/id/:id', async (req, res) => {
    try {
        const product = await ItemModel.findOne({ _id: `${req.params.id}` })
        res.json({ error: false, product })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//add item
router.post('/', async (req, res) => {
    try {
        const new_item_to_be_saved = new ItemModel(req.body)
        const new_saved_item = await new_item_to_be_saved.save()
        res.json({ error: false, new_saved_item, msg: "Item added successfully" })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})


//update
router.put('/', async (req, res) => {
    try {
        const { id, name, price, image } = req.body
        if (name) {
            const respones = await ItemModel.findByIdAndUpdate(id, { $set: { name } })
            res.json({ error: false, respones, msg: "Item updated successfully" })
        }
        if (price) {
            const respones = await ItemModel.findByIdAndUpdate(id, { $set: { price } })
            res.json({ error: false, respones, msg: "Item updated successfully" })
        }
        if (image) {
            const respones = await ItemModel.findByIdAndUpdate(id, { $set: { image } })
            res.json({ error: false, respones, msg: "Item updated successfully" })
        }
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//delete
router.delete('/remove/:id', async (req, res) => {
    try {
        const respones = await ItemModel.findByIdAndDelete(req.params.id)
        res.json({ error: false, msg })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})



module.exports = router
