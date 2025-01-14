const express = require('express');
const { validateToken, validateData } = require('../middlewares');

const router = express.Router();
const { getAllTalkers, getNextId,
  writeNewTalker, updateTalker, searchTalker,
  deleteTalker } = require('../utils/talkersHelper');

router.get('/', async (req, res) => {
  const talkers = await getAllTalkers();
  return res.status(200).send(talkers);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await searchTalker(q);
  return res.status(200).json(talkers);
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
  return res.status(201).json(newTalker);
});

router.put('/:id', validateToken, validateData, async (req, res) => {
  const { id } = req.params;
  const talkerData = req.body;
  const newTalker = { id: Number(id), ...talkerData };
  await updateTalker(newTalker);
  return res.status(200).json(newTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
