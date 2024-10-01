const express = require('express');

const router = express.Router();
const db = require('../db');

// just 3 quotes for now
const data = db.getAllQuotes();

const readIDRequest = (id, res) => {
  const chosenQuote = db.getQuoteById(id);
  if (id === '' || id == null || id === 'undefined') res.json(data);
  else if (chosenQuote != null) res.json(chosenQuote);
  else res.json({});
};

router.get('/', (req, res) => {
  const { id } = req.query; // note: ESLint airbnb/base insists on object destructuring syntax!
  console.log('req.query=', req.query);
  readIDRequest(id, res);
});

router.get('/', (req, res) => {
  res.json(data);
});

router.get('/recent', (req, res) => {
  res.json(db.recentQuote());
});

router.get('/random', (req, res) => {
  res.json(db.randomQuote());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  readIDRequest(id, res);
});

module.exports = router;
