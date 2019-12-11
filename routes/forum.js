const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Post = require('../models/Post');
const User = require('../models/User');
//const Profile = require('../models/Profile');

// GET all forum posts
router.get('/list', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({updatedAt: 'descending'});
    res.send({posts});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error while getting posts!');
  }
});

// GET post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.send({post});
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// POST - Create new post
router.post(
  '/create',
  [
    auth,
    [
      check('body', 'Text is required')
      .not()
      .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const user = await User.findById(req.user.id).select('-password');
    
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        name: user.name,
        user: req.user.id
      });

      const post = await newPost.save();
      res.send({post});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }      
});

// Update existing post
router.post('/update/:_id', (req, res) => {
    let options = { new: true };
      Post.findByIdAndUpdate(req.params._id, req.body.data , options, (err, post) => {
        if (err) return res.status(404).send({message: err.message});
        return res.send({ message: 'Post updated!', post });
      });
    });

// DELETE post by id
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user auth
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// Like a post
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.send({likes: post.likes});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Remove like from post
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Comment on a post
router.post('/comment/:id', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: req.body.name
      };

      post.comments.unshift(newComment);

      await post.save();

      res.send({comments: post.comments});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Delete comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    
    
    if (post.user !== req.user.id) {
      
      return res.status(401).json({ msg: `User not authorized` });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;