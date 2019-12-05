const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//CORS
app.use(cors());


// API ROUTES
app.use('/api/poe', require('./routes/poe'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});