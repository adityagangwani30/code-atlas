import { Router } from 'express';

const router = Router();
router.get('/items', (_req, res) => res.json([]));
router.post('/jobs', (_req, res) => res.status(202).send('queued'));

export default router;
