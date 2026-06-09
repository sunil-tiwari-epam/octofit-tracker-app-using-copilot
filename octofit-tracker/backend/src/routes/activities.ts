import { Router } from 'express';
import type { Request, Response } from 'express';
import Activity from '../models/activity.ts';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user', 'name email');
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activities' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

export default router;
