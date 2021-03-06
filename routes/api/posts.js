const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
/* @access  Private - because you have to be 
            logged in to create a post. */
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
      .not().isEmpty()
    ]
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      /* we have this "errors" object which has a method "array()" */
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      /* get user by user ID. we logged in so we have the token
      which gives us the user ID and puts it inside the
      "req.user.id". we don't want to send the password back
      so we'll use "select('-password')" */
      const user = await User.findById(req.user.id).select('-password');

      // there is a Post collection in the database
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        // we need an ObjectId from here below
        user: req.user.id
      });

      const post = await newPost.save();
      // Once we add the post, we'll get it back in the response
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
/* @access  Private - because we can see the Posts page only when 
            we are authorized. We usually need to add "auth" middle as a parameter
            of our route when we practice Private access. */
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      /* to get the value of the first element in the array, 
         we use "find()" (JS method), for single one - "findOne" (Mongoose
         method),
         parameter of { date: -1 } sort the post from the most recent one.
         { date: 1 } is to sort from the oldest one, but that's the default setting.  */
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts/:id
// @desc    Get post by (its) ID
/* @access  Private - we should be authorized */
router.get(
  '/:id',
  auth,
  async (req, res) => {
    try {
       /* Get the post by its ID.
          we insert "await" because mongoose methods like
          findOne() of findById() return a promise.
          "req.params.id" will allow us to get id from the URL. */ 
      const post = await Post.findById(req.params.id);

      if (!post) {
        // status of 404 means "not found"
        return res.status(404).json({ msg: 'Post not found' });
      }

      res.json(post);
    } catch (err) {
      console.error(err.message);
      /* the condition below means "if entered id is 
         a not formatted (valid) ObjectId". e.g, it's
         an ObjectId, the length of the id is valid,
         but id is wrong */
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post (by its ID)
// @access  Private - we should be authorized
router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      /* Get the post by its ID */
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' }); 
      }

      /* Check user.
         We check the user (id) because we wanna be sure that
         the user deleting the post is the one who owns the post.
         "req.user.id" is a logged in user. 
         We check if the post user is equal to the logged in user.
         But "post.user" has a type of "ObjectId", and "req.user.id"
         has a type of "String". So we'll concatenate a "toString()"
         method to the "post.user". */
      if (post.user.toString() !== req.user.id) {
        // status 401 - Not Authorized
        return res.status(401).json({ msg: 'User not authorized' }); 
      }

      await post.remove();
      
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
      /* the condition below means "if entered id is 
         a not formatted (valid) ObjectId". e.g, it's
         an ObjectId, the length of the id is valid,
         but id is wrong */
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

/* @route   PUT api/posts/like/:id - we put ":id" at the end because 
we need to know the post id on which the like was clicked. When we click
like (at the first time), our route should add this like to the array. 
Pressing like or unlike, we're updating "likes" array in the Post model.
We technically update the Post. */ 
// @desc    Like a post 
// @access  Private - we should be authorized
router.put(
  '/like/:id',
  auth,
  async (req, res) => {
    try {
      // fetch the post
      const post = await Post.findById(req.params.id);

      // Check if post has already been liked by this user
      /* filter() is a high-order array method.
         The filter() method creates a new array with 
         all elements that pass the test implemented by 
         the provided function (function that is passed in
         as a parameter of filter() method). 
         By the way, "likes" is an array.
         We wanna filter through element of an array.
         "like" is an unit of iteration.
         We'll compare the current iteration (user) to
         the user that is logged in. We'll turn "like.user"
         into a string so that it will actually match the
         user.id that's in "req.user.id", so we'll do
         "toString()". "req.user.id" is the logged-in user.
         And then we wanna check the length of that.
         If the length of the result of the filter() method
         is greater than 0, that means it's
         already been liked. That means that there's already
         a like in there ("req.user.id"), that has this user.
         1 is true, 0 is false. */
      if (post.likes.filter(like => like.user.toString() 
          === req.user.id).length > 0) {
            /* Status 400 - Bad Request */
            return res.status(400).json({ msg: 'Post already liked' });
      }

      // add on the beginning of an array
      post.likes.unshift({ user: req.user.id });

      // save the like back to the database
      await post.save();

      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post (remove a like)
// @access  Private - we should be authorized
router.put(
  '/unlike/:id',
  auth,
  async (req, res) => {
    try {
      // fetch a post by id
      const post = await Post.findById(req.params.id);

      // Check if post has already been liked by this
      // logged-in user
      /* if the length is equal to 0 (the filter returns "false"), 
         then that means we haven't liked the post yet. */ 
        if (post.likes.filter(like => like.user.toString() === 
            req.user.id).length === 0) {
            // Status 400 - Bad Request 
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
 
        /* Get remove index - means to get the user id (from the
           "likes" array) which should be removed.
           That will get the correct like to remove.
           The map() method creates a new array with the results 
           of calling a provided function on every element in 
           the calling array.
           So for each like we'll return like.user
           "req.user.id" is the logged-in user.  */
        const removeIndex = post.likes.map(like => like.user.toString())
                            .indexOf(req.user.id);
        
        /* Take out like from the "likes" array
           with "splice()" method.
           the second parameter of "1" means that
           we just wanna remove 1 from that. */
        post.likes.splice(removeIndex, 1);

        await post.save();
        
        res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/* @route   POST api/posts/comment/:id - we need the
post id to add a comment on. */ 
// @desc    Comment on a post
// @access  Private - we should be authorized
router.post(
  '/comment/:id',
  [
    // Get, check, verify token
    auth,
    // Validation
    [
      check('text', 'Text is required')
      .not()
      .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // errors is an object, array() is its method
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // get the user by id - we have user id in the token
      const user = await User.findById(req.user.id).select('-password');
      // get the post - we have it in the URL
      const post = await Post.findById(req.params.id);

      // Create comment
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }

      // Add the new comment on to "post.comments" array
      // add on the beginning of the array
      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/* @route   DELETE api/posts/comment/:id/:comment_id - because
we need both post id and comment id. We need to find the post
by the id and then we need to know which comment to delete.  */
// @desc    Delete comment
// @access  Private - we should be authorized
router.delete(
  '/comment/:id/:comment_id',
  auth,
  async (req, res) => {
    try {
      // get the post by its id which is in the URL
      const post = await Post.findById(req.params.id);

      // pull out (get) the comment from the post
      /* we wanna find a comment by its id.
         find() method takes in functions like
         forEach(), map(), filter(). find() kinda
         copy their functionality.
         We wanna test to see if the comment.id
         is equal to the comment_id. This will give us
         either comment (if it exists) or "false". */
      const comment = post.comments
      .find(comment => comment.id === req.params.comment_id);
      // Make sure comment exists
      if (!comment) {
        // Status 404 - Not Found
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      /* Check user - we need to make sure that the user deleting comment
         actually made it.
         The comment (object) has an "user" property that is shown as
         an user id. "comment.user" is a user who made comment, "req.user.id" is a logged-in user deleting this comment.
         "comment.user" is an ObjectId, so we'll turn it to a string. */
      if (comment.user.toString() !== req.user.id) {
        // Status 401 - Not Authorized (Unauthorized)
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // Get remove index - to remove the found comment
      const removeIndex = post.comments
      .map(comment => comment.user.toString()).indexOf(req.user.id);

      /*  Take out the comment from the "comments" array
          with "splice()" method.
          the second parameter of "1" means that
          we just wanna remove 1 from that. */
      post.comments.splice(removeIndex, 1);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
