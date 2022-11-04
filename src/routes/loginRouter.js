const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { validateLogin } = require('../middlewares');

router.post('/', validateLogin, (req, res) => {
  const generateCrypto = () => crypto.randomBytes(8).toString('hex');
  const token = generateCrypto();
  res.status(200).send({ token });
});

module.exports = router;
