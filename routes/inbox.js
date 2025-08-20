
// its working good

// import express from 'express';

// import { getMessages, getMessageContent } from '../services/mailService.js';

// const router = express.Router();

// // Get message list
// router.get('/:token', async (req, res) => {
//   try {
//     const messages = await getMessages(req.params.token);
//     res.json(messages);
//   } catch (err) {
//     console.error('Inbox error:', err);
//     res.status(500).json({ 
//       error: err.message || 'Failed to fetch inbox',
//       details: err.response?.data
//     });
//   }
// });

// // Get message content
// router.get('/content/:token/:messageId', async (req, res) => {
//   try {
//     const content = await getMessageContent(
//       req.params.token,
//       req.params.messageId
//     );
//     res.json(content);
//   } catch (err) {
//     res.status(500).json({ 
//       error: err.message || 'Failed to fetch message content'
//     });
//   }
// });

// export default router;


// final

import express from 'express';
import { getMessages, getMessageContent } from '../services/mailService.js';

const router = express.Router();

router.get('/:token', async (req, res) => {
  try {
    const messages = await getMessages(req.params.token);
    res.json(messages);
  } catch (err) {
    console.error('Inbox error:', err);
    res.status(500).json({ 
      error: err.message || 'Failed to fetch inbox',
      details: err.response?.data
    });
  }
});

router.get('/content/:token/:messageId', async (req, res) => {
  try {
    const content = await getMessageContent(
      req.params.token,
      req.params.messageId
    );
    res.json(content);
  } catch (err) {
    res.status(500).json({ 
      error: err.message || 'Failed to fetch message content'
    });
  }
});

export default router;