import express from 'express';
import accountRouter from './accounts.js';
import inboxRouter from './inbox.js';

const router = express.Router();
router.use('/accounts', accountRouter);
router.use('/inbox', inboxRouter);

router.get('/', (req, res) => {
  res.send('API working');
})
export default router;