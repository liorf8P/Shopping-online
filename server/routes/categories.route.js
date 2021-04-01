const router = require('express').Router()
const { CategoryModel } = require('../models/category.model')

//get all categories
router.get('/', async (req, res) => {
	try {
		const categories = await CategoryModel.find()
		res.json({ error: false, categories })
	} catch (err) {
		res.status(500).json({ error: true, err })
	}
})

// get category name by category id
router.get('/:category_id', async (req, res) => {
	try {
		const categoryName = await CategoryModel.findOne({ _id: `${req.params.category_id}` })
		res.json({ error: false, categoryName })
	} catch (err) {
		res.status(500).json({ error: true, err })
	}
})

//add category
router.post('/', async (req, res) => {
	try {
		const new_category_to_be_saved = new CategoryModel(req.body)
		const new_saved_category = await new_category_to_be_saved.save()
		res.json({ error: false, new_saved_category })
	} catch (err) {
		res.status(500).json({ error: true, err })
	}
})


module.exports = router
