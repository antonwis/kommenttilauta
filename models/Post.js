const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = Schema(
    {
        title: {
            type: String,
            required: false
        },
        body: {
            type: String,
            required: false
        }
        
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;