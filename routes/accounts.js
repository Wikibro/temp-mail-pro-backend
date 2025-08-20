import express from 'express';
import { createAccount } from '../services/accountsService.js';

const router = express.Router();
router.post('/create', async (req, res) => {
  try {
    const account = await createAccount();
    res.json(account);
  } catch (err) {
    console.error('Account creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;