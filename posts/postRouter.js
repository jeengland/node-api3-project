// dependencies
const express = require('express');

const db = require('./postDb.js');

// router setup
const router = express.Router();

// endpoints
// ----- BASE URL: /api/posts -----
router.get('/', (req, res) => {
  db.get()
    .then((posts) => {
      res.status(200).json({ posts })
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'Posts could not be retrieved'
      })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then((post) => {
      res.status(200).json({ post })
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'Post could not be retrieved'
      })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
  .then((count) => {
    if (count) {
      res.status(200).json({
        message: 'Post successfully deleted!'
      })
    } else {
      res.status(500).json({
        errorMessage: 'Post could not be deleted.'
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({
      errorMessage: 'Post could not be deleted'
    })
  })
});

router.put('/:id', [validatePostId, validatePost], (req, res) => {
  const id = req.params.id;
  const newPost = req.body;
  db.update(id, newPost) 
  .then((count) => {
    if (count) {
      res.status(200).json({
        message: 'Post successfully updated!'
      })
    } else {
      res.status(500).json({
        errorMessage: 'Post could not be updated.'
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({
      errorMessage: 'Post could not be updated'
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  db.getById(id)
    .then((valid) => {
      if (valid) {
        next();
      } else {
        res.status(400).json({
          errorMessage: 'Invalid post ID!'
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: 'Unable to validate post ID.'
      })
    })
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
