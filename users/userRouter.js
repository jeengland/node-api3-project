// dependencies
const express = require('express');

const db = require('./userDb');

// router setup
const router = express.Router();


// endpoints
// ----- BASE URL: /api/users -----

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  res.send('router is working!')
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).send('validated!')
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  db.getById(id)
    .then((valid)=> {
      if (valid) {
        next();
      } else  {
        res.status(400).json({ 
          errorMessage: 'Invalid user ID!'
        })
      }
    })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
