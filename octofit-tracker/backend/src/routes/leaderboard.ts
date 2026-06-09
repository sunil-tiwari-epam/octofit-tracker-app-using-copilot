import { Router } from 'express';
import type { Request, Response } from 'express';
import Leaderboard from '../models/leaderboard.ts';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const entries = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('user', 'name email')
      .populate('team', 'name');
    res.json({ data: entries });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

export default router;
