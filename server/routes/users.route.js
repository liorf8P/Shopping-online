const router = require('express').Router()
const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// get user id if userid Exist
router.get('/:id', async (req, res) => {
	try {
		const user_id = await UserModel.findOne({ citizenID: `${req.params.id}` })
		res.json({ error: false, user_id })
	} catch (error) {

	}
})

router.post('/register', async (req, res) => {
	try {
		const user_to_be_saved = new UserModel(req.body)
		const hash = await bcrypt.hash(req.body.password, 10)
		user_to_be_saved.password = hash
		await user_to_be_saved.save()
		res.json({ err: false, msg: 'User added successfully, Log in to your account' })
	} catch (error) {
		res.status(400).json({ err: true, error })
	}
})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await UserModel.findOne({ email: `${email}` })
		if (!user) throw new Error('User not found')
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) throw new Error('Wrong password')
		const token = jwt.sign(
			{ ...user, password: '******' },
			process.env.JWT_SECRET,
			{ expiresIn: '300m' }
		)
		res.json({ err: false, token, msg: "User connected successfully" })
	} catch (error) {
		res.status(400).json({ err: true, error: error.message })
	}
})

module.exports = router

