const router = require('express').Router();
const { apiIndex } = require('../constants/html');

router.get('/', (req, res) => {
	res.send(apiIndex);
});

module.exports = router;
