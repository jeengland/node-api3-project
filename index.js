// dependencies
const express = require('express');

const middleware = require('./server.js');

const userRouter = require('./users/userRouter');

// server setup
const server = express();

// middleware
server.use(express.json());
server.use(middleware.logger);

// routers 
server.use('/api/users', userRouter)

// test endpoint
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server for Node API Project 3 is live' })
})

const port = 5000;

server.listen(port, () => {
    console.log(`\n ~~~ Server running on port ${port} ~~~`)
});
