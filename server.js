const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');



//Load env cfg
dotenv.config({ path: "./config.env" });

const app = express();

// Dev logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Database config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Path of Exile api routes
app.use('/api/profile', require('./routes/profile'));

// Forum routes
app.use('/api/forum', require('./routes/forum'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});