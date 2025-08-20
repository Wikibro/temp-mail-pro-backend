// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const waitForEmail = require('../services/getLatestEmail');

// GET /email/wait?address=xxx&password=yyy
router.get('/wait', async (req, res) => {
    const { address, password } = req.query;

    if (!address || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await waitForEmail(address, password, 60000, 5000); // 1 min wait, 5 sec interval
    res.json(result);
});

module.exports = router;
