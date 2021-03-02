const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const University = require('../../../models/webometrics.model');
const verifyToken = require('../../../middlewares/verifyToken');

/**
 * @openapi
 * /api/v1/webometrics:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', async (req, res) => {
	try {
		const data = await University.find();
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @openapi
 * /api/v1/webometrics/:id:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/:id', getUniversityById, (req, res) => {
	res.status(200).json(res.data);
});

/**
 * @openapi
 * /api/v1/webometrics:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/', verifyToken, async (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
		if (err) {
			res.status(403).json({ status: 403, message: 'forbidden' });
		} else {
			const university = new University({
				university: req.body.university,
				website: req.body.website,
				national_rank: req.body.national_rank,
				international_rank: req.body.international_rank,
				impact_rank: req.body.impact_rank,
				openness_rank: req.body.openness_rank,
				excellence_rank: req.body.excellence_rank,
			});
			try {
				const payload = await university.save();
				res.status(201).json({
					status: 201,
					message: 'new university data added to database',
					data: payload,
				});
			} catch (err) {
				res.status(400).json({ message: err.message });
			}
		}
	});
});

/**
 * @openapi
 * /api/v1/webometrics/:id:
 *   patch:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.patch('/:id', verifyToken, getUniversityById, async (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
		if (err) {
			res.status(403).json({ status: 403, message: 'forbidden' });
		} else {
			if (req.body.university != null) {
				res.data.university = req.body.university;
			}
			if (req.body.website != null) {
				res.data.website = req.body.website;
			}
			if (req.body.national_rank != null) {
				res.data.national_rank = req.body.national_rank;
			}
			if (req.body.international_rank != null) {
				res.data.international_rank = req.body.international_rank;
			}
			if (req.body.impact_rank != null) {
				res.data.impact_rank = req.body.impact_rank;
			}
			if (req.body.openness_rank != null) {
				res.data.openness_rank = req.body.openness_rank;
			}
			if (req.body.excellence_rank != null) {
				res.data.excellence_rank = req.body.excellence_rank;
			}
			try {
				const updatedUniversityData = await res.data.save();
				res.status(201).json({
					status: 200,
					message: 'university data updated',
					data: updatedUniversityData,
				});
			} catch (err) {
				res.status(400).json({ message: err.message });
			}
		}
	});
});

/**
 * @openapi
 * /api/v1/webometrics/:id:
 *   delete:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.delete('/:id', verifyToken, getUniversityById, async (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
		if (err) {
			res.status(403).json({ status: 403, message: 'forbidden' });
		} else {
			try {
				await res.data.remove();
				res.status(200).json({
					status: 200,
					message: 'university data deleted from database',
				});
			} catch (err) {
				res.status(500).json({ message: err.message });
			}
		}
	});
});

async function getUniversityById(req, res, next) {
	let university;
	try {
		university = await University.findById(req.params.id);
		if (!university) {
			return res.status(404).json({ message: 'university not found' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.data = university;
	next();
}

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
