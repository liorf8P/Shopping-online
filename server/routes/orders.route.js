const router = require('express').Router()
const { OrderModel } = require('../models/order.model')


//get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await OrderModel.find()
        res.json({ error: false, orders })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//get all orders date
router.get('/getordersdate/:currect_date', async (req, res) => {
    try {
        const dates = await OrderModel.find({ delivery_date: `${req.params.currect_date}` })
        res.json({ error: false, dates })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//get last order by date
router.get('/:user_id', async (req, res) => {
    try {
        const order = await OrderModel.find({ user: `${req.params.user_id}` }).sort({ "order_date": -1 }).limit(1)
        res.json({ error: false, order })
    } catch (err) {
        res.status(500).json({ error: true, err })
    }
})

//add order
router.post('/', async (req, res) => {
    try {
        const order_to_be_saved = new OrderModel(req.body)
        await order_to_be_saved.save()
        res.json({ error: false, msg: "order added successfully" })
    } catch (error) {
        res.status(500).json({ err: true, msg: error.massage })
    }
})

module.exports = router
