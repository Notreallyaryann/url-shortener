import express from 'express';

import { createShortUrl, redirectToUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/:shortId', redirectToUrl);

export default router;
