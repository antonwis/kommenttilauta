const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
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
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;