const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


// Get all ongoing leagues
router.get('/leagues/list', async (req, res) => {

    try {
        
        const response = await fetch(`${process.env.PoE_API_URL}/leagues?type=main`);

        const data = await response.json();

        if(data.error && data.error.code === 1) {
            return res.status(404).json({
                message: 'Resource Not Found'
            });
        }

        res.send({data});
            
    } catch (err) {
    console.error(err);
    res.status(500).json({
        message: 'Server error'
    });
    }
});

// Get league by name
router.get('/leagues/:league', async (req, res) => {

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

// Get a league's ladder by name
router.get('/ladder/:league', async (req, res) => {

    try {
        
        const response = await fetch(`${process.env.PoE_API_URL}/ladders/${req.params.league}`);

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

// Get character list by account name
// https://www.pathofexile.com/character-window/get-characters?accountName=Murha
router.get('/account/:accountName', async (req, res) => {

    try {
        
        const response = await fetch(`${process.env.PoE_CHAR_API_URL}/get-characters?accountName=${req.params.accountName}`);

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

// Get passive tree & jewel data by account & character name
// https://www.pathofexile.com/character-window/get-passive-skills?accountName=Murha&character=RANKOHUORA
router.get('/account/:accountName/:charName/passives', async (req, res) => {

    try {
        
        const response = await fetch(`${process.env.PoE_CHAR_API_URL}/get-passive-skills?accountName=${req.params.accountName}&character=${req.params.charName}`);

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

// GET items by account name & character name
// https://www.pathofexile.com/character-window/get-items?accountName=Murha&character=RANKOHUORA
router.get('/account/:accountName/:charName/items', async (req, res) => {

    try {
        
        const response = await fetch(`${process.env.PoE_CHAR_API_URL}/get-items?accountName=${req.params.accountName}&character=${req.params.charName}`);

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