const express = require('express');
const router = express.Router();
const { getAllTalkers } = require('../utils/handleTalkers');

router.get('/', async (req, res) => {
  const talkers = await getAllTalkers();
  return res.status(200).send(talkers)
});

router.get('/:id', async (req, res) => {
  const talkers = await getAllTalkers();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).send(talker)
});

module.exports = router;
