const validateName = (name) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  return 'OK';
};

const validateAge = (age) => {
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';
  return 'OK';
};

const checkNumber = (number) => {
  if (
    !Number.isInteger(number)
    || Number.isNaN(number)
    || number < 1
    || number > 5
  ) return false;
  return true;
};

const validateDateAndRate = (date, rate) => {
  const dateRegex = /\d{2}\/\d{2}\/\d{4}/g;
  if (!dateRegex.test(date)) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  if (!checkNumber(rate)) return 'O campo "rate" deve ser um inteiro de 1 à 5';
  return 'OK';
};

const validateTalk = (talk) => {
  if (!talk) return 'O campo "talk" é obrigatório';
  if (!talk.watchedAt) return 'O campo "watchedAt" é obrigatório';
  if (!talk.rate && talk.rate !== 0) return 'O campo "rate" é obrigatório';
  return validateDateAndRate(talk.watchedAt, talk.rate);
};

const validateData = (req, res, next) => {
  const { name, age, talk } = req.body;
  const nameValidation = validateName(name);
  const ageValidation = validateAge(age);
  const talkValidation = validateTalk(talk);

  if (nameValidation !== 'OK') return res.status(400).json({ message: nameValidation });

  if (ageValidation !== 'OK') return res.status(400).json({ message: ageValidation });

  if (talkValidation !== 'OK') return res.status(400).json({ message: talkValidation });

  return next();
};

module.exports = validateData;
