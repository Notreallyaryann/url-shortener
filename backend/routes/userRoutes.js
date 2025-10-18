import express from 'express';

import { createShortUrl, redirectToUrl,getTopLinks } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/top',getTopLinks)
router.get('/:shortID', redirectToUrl);


export default router;
