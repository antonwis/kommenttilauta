const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;