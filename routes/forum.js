const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


// List forum posts
router.get('/list', (req, res) => {
    Post.find({}).sort({updatedAt: 'descending'}).exec((err, posts) => {
      if (err) return res.status(404).send('Error while getting posts!');
      return res.send({posts});
    });
  });

// Create new post
router.post('/create', (req, res) => {
    const post = new Post(
        {
            title: req.body.title,
            body: req.body.body,
            likes: 0,
            comments: "",
            date: date
        }
    );
post.save( (err) => {
      if (err) return res.status(404).send({message: err.message});      
      return res.send({ post });
    });
  });

// Update existing post
router.post('/update/:id', (req, res) => {
    let options = { new: true };
      Post.findByIdAndUpdate(req.params.id, req.body.data , options, (err, post) => {
        if (err) return res.status(404).send({message: err.message});
        return res.send({ message: 'post updated!', post });
      });
    });
