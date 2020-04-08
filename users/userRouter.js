// dependencies
const express = require('express');

const db = require('./userDb');

// router setup
const router = express.Router();


// endpoints
// ----- BASE URL: /api/users -----

router.post('/', validateUser, (req, res) => {
  res.status(200).send('validateUser is working!')
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  res.status(200).send('validatePost is working!')
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
    .then((valid) => {
      if (valid) {
        next();
      } else  {
        res.status(400).json({ 
          errorMessage: 'Invalid user ID!'
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'User was not able to be validated'
      })
    })
}

function validateUser(req, res, next) {
  const body = req.body;
  if (Object.keys(body).length) {
    if (body.name) {
      next();
    } else {
      res.status(400).json({
        errorMessage: 'Missing required name field!'
      })
    }
  } else {
    res.status(400).json({ 
      errorMessage: 'Missing user data!'
    });
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  if (Objects.keys(body).length) {
    if (body.text) {
      next();
    } else {
      res.status(400).json({
        errorMessage: 'Missing required text field!'
      })
    }
  } else {
    res.status(400).json({
      errorMessage: 'Missing post data!'
    })
  }
}

module.exports = router;
