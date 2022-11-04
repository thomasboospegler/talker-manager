const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const response = await fs.readFile(talkerPath, 'utf-8');
  const talkers = JSON.parse(response);
  return talkers;
};

const getNextId = async () => {
  const data = await getAllTalkers();
  const biggerId = Math.max(...data.map(({ id }) => id));
  return biggerId + 1;
};

const writeNewTalker = async (talker) => {
  const data = await getAllTalkers();
  await fs.writeFile(talkerPath, JSON.stringify([...data, talker], 2));
};

const updateTalker = async (talker) => {
  const data = await getAllTalkers();
  const newData = data.map((talk) => (talk.id === talker.id ? talker : talk));
  await fs.writeFile(talkerPath, JSON.stringify(newData, 2));
};

const deleteTalker = async (id) => {
  const data = await getAllTalkers();
  const newData = data.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(talkerPath, JSON.stringify(newData, 2));
};

const searchTalker = async (q) => {
  const data = await getAllTalkers();
  const newData = data.filter((talker) => !q || talker.name.includes(q));
  return newData;
};

module.exports = {
  getAllTalkers,
  getNextId,
  writeNewTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
};
