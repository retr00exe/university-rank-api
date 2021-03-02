const express = require('express');
const router = express.Router();
const University = require('../../../models/webometrics.model');

const getUniversityById = async (req, res, next) => {
	let university;
	try {
		university = await University.findById(req.params.id);
		if (university == null) {
			return res.status(404).json({ message: 'University not found' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.data = university;
	next();
};

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
router.post('/', async (req, res) => {
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
		res.status(201).json(payload);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
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
router.patch('/:id', getUniversityById, async (req, res) => {
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
		res.status(201).json(updatedUniversityData);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
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
router.delete('/:id', getUniversityById, async (req, res) => {
	try {
		await res.data.remove();
		res.json({ message: `University data deleted` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
