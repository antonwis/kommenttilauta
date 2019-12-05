const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


// https://api.pathofexile.com/leagues/SSF%20Blight%20HC
router.get('/:league', async (req, res) => {

    try {
        const headers = {
            // todo: en tiedä mihin tätä tarvii
        }
        const { league } = req.params;

        const response = await fetch(`${process.env.PoE_API_URL}/${league}`,
        {
            headers
        }
        );

        const data = await response.json();

        if(data.error && data.error.code === 1) {
            return res.status(404).json({
                message: 'Resource Not Found'
            });
        }

        res.json(data);
            
    } catch (err) {
    console.error(err);
    res.status(500).json({
        message: 'Server error'
    });
    }
    console.log(req.params.league);
    res.send('Hello');
});

module.exports = router;