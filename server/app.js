const express = require('express');
const app = express();

app.use('/test-json', express.json()) // task 2 - need to parse body from request

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware

app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end() 
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', (req, res) => {
  throw new Error("Hello World!")
  next(err);                       // task 3 - for asynhronous functions next(err) is must!
});


app.use('/static' , express.static('assets')); // task 1 - for static 

app.use((err, req, res, next) => {
  res.json("Error: " + err.message);
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));