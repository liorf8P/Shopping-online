const router = require('express').Router()
const { CartItemModel } = require('../models/cartitem.model')

//get all items from cart
router.get('/:cart_id', async (req, res) => {
    try {
        const items = await CartItemModel.find({ cart: `${req.params.cart_id}` }).populate('item')
        res.json({ error: false, items })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//add item to cart
router.post('/', async (req, res) => {
    try {
        const cart_item_to_be_saved = new CartItemModel(req.body)
        const new_cart_item = await cart_item_to_be_saved.save()
        res.json({ error: false, msg: "item added successfully to your own cart", new_cart_item })
    } catch (error) {
        res.status(500).json({ err: true, msg: error.massage })
    }
})

//remove item from cart
router.delete('/:id', async (req, res) => {
    try {
        const removed_item = await CartItemModel.findByIdAndDelete(req.params.id)
        res.json({ error: false, msg: "item removed successfully from your cart", removed_item })
    } catch (err) {
        res.status(500).json({ error: true, msg: err.message })
    }
})

module.exports = router
