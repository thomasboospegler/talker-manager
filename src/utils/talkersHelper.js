const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const response = await fs.readFile(talkerPath, 'utf-8');
  const talkers = JSON.parse(response);
  return talkers;
};

const getNextId = async () => {
  const content = await getAllTalkers();
  const biggerId = Math.max(...content.map(({ id }) => id));
  return biggerId + 1;
};

const writeNewTalker = async (talker) => {
  const content = await getAllTalkers();
  await fs.writeFile(talkerPath, JSON.stringify([...content, talker]));
};

module.exports = {
  getAllTalkers,
  getNextId,
  writeNewTalker,
};
