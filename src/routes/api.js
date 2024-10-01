const express = require('express');

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

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

router.post('/addHoot', (req, res) => {
  //console.log('req.body.content=', req.body.content);
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

module.exports = router;
