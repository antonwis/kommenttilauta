const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Post = require('../models/Post');

// List forum posts
router.get('/list', (req, res) => {
    Post.find({}).sort({updatedAt: 'descending'}).exec((err, posts) => {
      if (err) return res.status(404).send('Error while getting posts!');
      return res.send({posts});
    });
  });

// Create new post
router.post('/create', (req, res) => {

  const post = new Post({title: req.body.title, body: req.body.body});
  post.save( (err) => {
    if (err) return console.log(err);      
    return res.send({ post });
  });
});

// Update existing post
router.post('/update/:_id', (req, res) => {
    let options = { new: true };
      Post.findByIdAndUpdate(req.params._id, req.body.data , options, (err, post) => {
        if (err) return res.status(404).send({message: err.message});
        return res.send({ message: 'Post updated!', post });
      });
    });

// delete an existing note with the given object id
router.post('/delete/:_id', (req,res) => {
  Post.findByIdAndRemove(req.params._id, (err) => {
    if (err) return res.status(404).send({message: err.message});
    return res.send({ message: 'Post deleted.' });
  });
});

module.exports = router;