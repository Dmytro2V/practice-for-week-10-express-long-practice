const express = require('express');
const app = express();

app.use('/test-json', express.json()) // Phase 1 task 2 - need to parse body from request


// Phase 2 task 1Logger Middleware
// Create a middleware function that will log the method and URL path of the request to the terminal 
//for all requests to the server.
app.use((req, res, next) => {
  console.log('request method: ', req.method);
  console.log('request URL: ', req.url);
  res.on('finish', () => { // Phase 2 task2 - responce code on event listener (when ready)
    // read and log the status code of the response
    console.log(res.statusCode);
  });
  next();
})
app.use('/static' , express.static('assets')); // Phase 1 task 1 - for static 
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
  next(err);                       // Phase 1 task 3 - for asynhronous functions next(err) is must!
});



//Phase 2 task 3 - Resource Not Found
app.use( (req, res) => {  
  res.statusCode = 404;
  throw new Error("The requested resource couldn't be found.")
});
app.use((err, req, res, next) => { // Phase 1 task 3 error listener
  res.json("Error: " + err.message);
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));