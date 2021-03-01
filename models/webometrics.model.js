const mongoose = require('mongoose');

const UniversitySchema = mongoose.Schema({
	university: {
		type: String,
		required: true,
	},
	website: {
		type: String,
		required: true,
	},
	national_rank: {
		type: Number,
		required: true,
	},
	international_rank: {
		type: Number,
		required: true,
	},
	impact_rank: {
		type: Number,
		required: true,
	},
	openness_rank: {
		type: Number,
		required: true,
	},
	excellence_rank: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('webometrics', UniversitySchema);
