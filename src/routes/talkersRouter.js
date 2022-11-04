const express = require('express');
const { validateToken, validateData } = require('../middlewares');

const router = express.Router();
const { getAllTalkers, getNextId, writeNewTalker } = require('../utils/talkersHelper');

router.get('/', async (req, res) => {
  const talkers = await getAllTalkers();
  return res.status(200).send(talkers);
});

router.get('/:id', async (req, res) => {
  const talkers = await getAllTalkers();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).send(talker);
});

router.post('/', validateToken, validateData, async (req, res) => {
  const talkerData = req.body;
    const newTalker = { id: await getNextId(), ...talkerData };
    await writeNewTalker(newTalker);
    res.status(201).json(newTalker);
});

module.exports = router;
