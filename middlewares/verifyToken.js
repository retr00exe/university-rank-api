async function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(' ')[1];
		req.token = bearerToken;
		next();
	} else {
		res.status(403).json({ status: 403, message: 'forbidden' });
	}
}

module.exports = verifyToken;
