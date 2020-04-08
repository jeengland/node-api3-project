const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

server.logger = function(req, res, next) {
  console.log(`\nMethod: ${req.method}\nURL: ${req.originalUrl}\nTime: ${new Date().toTimeString()}`)
  next();
}

module.exports = server;
