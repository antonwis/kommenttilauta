const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


// Get all ongoing leagues
router.get('/list', async (req, res) => {

    try {
        
        const response = await fetch(`${process.env.PoE_API_URL}/leagues?type=main`);

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
});

// Get league by name
router.get('/:league', async (req, res) => {

    try {
        
        const response = await fetch(`${process.env.PoE_API_URL}/leagues/${req.params.league}`);

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
});



module.exports = router;