const express = require('express');

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

const getHootById = (id) => hoots.find((h) => h.id === id);

const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) return null;
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  return hoot;
};

const router = express.Router();

router.get('/helloJSON', (req, res) => {
  res.send({ message: 'Hello there!' });
});

router.get('/timeJSON', (req, res) => {
  const date = new Date();
  const dateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  res.send({ message: dateString });
});

router.get('/hoots', (req, res) => {
  res.send(hoots);
});

router.get('/hoots/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: ${req.params.id} not found`;
    res.status(404).send({ error });
  } else {
    res.send(hoot);
  }
});

router.post('/addHoot', (req, res) => {
  // console.log('req.body.content=', req.body.content);
  const content = req.body && req.body.content
    ? req.body.content : 'No req.body or req.body.content found!';

  const hoot = {
    id: generateNewId(),
    content,
    createdAt: new Date(),
  };

  hoots.push(hoot);
  res.status(201).json(hoot);
});

router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  // res.send('The id you specified for DELETE is ' + req.params.id);
  const hoot = deleteHootById(req.params.id);
  if (!hoot) {
    const error = `id: ${req.params.id} not found`;
    res.status(404).send({ error });
  } else {
    res.json(hoot);
  }
});

router.put('/updateHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  // console.log(`The id you specified for PUT is ${req.params.id}`);
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: ${req.params.id} not found`;
    res.status(404).send({ error });
  } else {
    const content = req.body && req.body.content
      ? req.body.content
      : 'No req.body or req.body.content found!';
    hoot.content = content;
    hoot.updatedAt = new Date();
    res.json(hoot);
  }
});

module.exports = router;
