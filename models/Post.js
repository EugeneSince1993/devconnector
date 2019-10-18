const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post collection
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  /* name of the user - so that if the user will be deleted,
     we would be able not to delete his posts. */
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  /* "likes" will be an array of users objects that have the id,
      which is an "ObjectId" */
  likes: [ 
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);