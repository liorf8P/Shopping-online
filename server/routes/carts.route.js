const router = require('express').Router()
const { CartModel } = require("../models/cart.model")

//get all carts by user
router.get('/user/all/:id', async (req, res) => {
    try {
        const carts = await CartModel.find({ user_id: `${req.params.id}` })
        res.json({ error: false, carts })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//get user's uncompleted cart
router.get('/user/current/:id', async (req, res) => {
    try {
        const cart = await CartModel.findOne({ user_id: `${req.params.id}`, isCompleted: false })
        res.json({ error: false, cart })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//open new cart
router.post('/', async (req, res) => {
    try {
        const cart_to_be_saved = new CartModel(req.body)
        await cart_to_be_saved.save()
        res.json({ error: false, cart_to_be_saved })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: true, err })
    }
})


//close cart (mark as completed)
router.put('/:id', async (req, res) => {
    try {
        const respones = await CartModel.findByIdAndUpdate(req.params.id, { $set: { isCompleted: true } })
        res.json({ error: false, respones })
    } catch (err) {
        res.status(500).json({ error: true, msg: 'thank, hope to serve you again' })
    }
})

module.exports = router

