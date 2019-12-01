const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//Load env cfg
dotenv.config({ path: "./config.env" });

const app = express();

// Dev logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Path of Exile profile routes
app.use('/api/profile', require('./routes/profile'));


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});