const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const Admin = require('../models/admin.model');
const verifyToken = require('../middlewares/verifyToken');

router.post('/:id', verifyToken, getAdminById, async (req, res) => {
	if (await bcrypt.compare(req.body.password, res.data.admin.password)) {
		jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
			if (err) {
				res.status(403).json({ status: 403, message: 'forbidden' });
			} else {
				res
					.status(200)
					.json({ status: 200, message: 'JWT authorization success' });
			}
		});
	} else {
		res.status(403).json({ status: 403, message: 'halo' });
	}
});

async function getAdminById(req, res, next) {
	let admin;
	try {
		admin = await Admin.findById(req.params.id);
		if (!admin) {
			return res.status(404).json({ message: 'admin not found' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.data = admin;
	next();
}

module.exports = router;
