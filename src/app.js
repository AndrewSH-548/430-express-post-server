const express = require('express');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
// import routes (put this near top)
const indexRouter = require('./routes/index.js');
const quotesRouter = require('./routes/quotes.js');
const apiRouter = require('./routes/api.js');
const complainRouter = require('./routes/complain.js');

// put this AFTER we instantiate `app`, and BEFORE our GET and POST routes
app.use(express.static('client'));
// put this right after the other `app.use()` call
app.use(express.json());

// use routes (put this near the bottom, BEFORE app.listen()
app.use('/quotes', quotesRouter);
app.use('/api', apiRouter);

app.use('/complain', complainRouter);
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
