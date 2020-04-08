// dependencies
const express = require('express');

const userDb = require('./userDb');
const postDb = require('../posts/postDb');

// router setup
const router = express.Router();

// endpoints
// ----- BASE URL: /api/users -----

router.post('/', validateUser, (req, res) => {
  const newUser = req.body
  userDb.insert(newUser)
    .then((user) => {
      res.status(201).json({ user })
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'User was not created.'
      })
    })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  const id = req.params.id;
  const post = req.body;
  post.user_id = id;
  postDb.insert(post)
    .then((post) => {
      res.status(201).json({ post })
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'Post could not be created.'
      })
    })
});

router.get('/', (req, res) => {
  userDb.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'Users data could not be retrieved.'
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.getById(id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'User data could not be retrieved.'
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.getUserPosts(id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'User posts could not be retrieved.'
      })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.remove(id)
    .then((count) => {
      if (count) {
        res.status(200).json({
          message: 'User successfully deleted!'
        })
      } else {
        res.status(500).json({
          errorMessage: 'User could not be deleted.'
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'User could not be deleted'
      })
    })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  const id = req.params.id;
  const newUser = req.body;
  userDb.update(id, newUser)
  .then((count) => {
    if (count) {
      res.status(200).json({
        message: 'User successfully updated!'
      })
    } else {
      res.status(400).json({
        errorMessage: 'User by ID could not be found'
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({
      errorMessage: 'User could not be updated'
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDb.getById(id)
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
  if (Object.keys(body).length) {
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
