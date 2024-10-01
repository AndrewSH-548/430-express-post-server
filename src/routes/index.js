const express = require('express');

const router = express.Router();

const path = require('path');

const filePath404Page = path.resolve(__dirname, '../../client/404.html');

router.get('/', (req, res) => {
  res.send('Hello world!');
});

router.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

router.post('/addComment', (req, res) => {
  res.send("You just called the post method at '/addComment'!");
});

// .all refers to ALL http methods - GET, POST, DELETE etc
// note .status(404) and method chaining
// .status(404) is how we send the 404 - File Not Found status code
router.all('*', (req, res) => {
  res.status(404).sendFile(filePath404Page);
});

module.exports = router;
