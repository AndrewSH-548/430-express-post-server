const express = require('express');

const router = express.Router();

router.get('/helloJSON', (req, res) => {
  res.send({ message: 'Hello there!' });
});

router.get('/timeJSON', (req, res) => {
  const date = new Date();
  const dateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  res.send({ message: dateString });
});

module.exports = router;
