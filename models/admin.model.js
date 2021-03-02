const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
	admin: {
		email: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	token: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('admin', AdminSchema);
