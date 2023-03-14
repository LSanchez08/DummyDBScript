const router = require('express').Router();

const dbManager = require('../controllers/dbManager');

router.post(`/:collection`, async (req, res) => {
  const info = {
    collection: req.params.collection,
    payload: req.body
  };

  const response = await dbManager.postMethod(info);

  res.status(response.response.status).json(response);
});

router.get(`/:collection`, async (req, res) => {
  const info = {
    collection: req.params.collection
  };

  const response = await dbManager.getMethod(info);

  res.status(response.response.status).json(response);
});

router.get('/run/script', async (req, res) => {
  const response = await dbManager.execute();

  res.status(response.response.status).json(response);
})

module.exports = router;
