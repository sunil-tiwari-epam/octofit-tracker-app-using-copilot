import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/activity.ts';

const router = Router();

const fallbackActivities = [
  { id: 'act-1', user: { name: 'Alice Morgan' }, type: 'run', distanceKm: 6.2, durationMinutes: 38 },
  { id: 'act-2', user: { name: 'Bob Chen' }, type: 'cycle', distanceKm: 22, durationMinutes: 65 },
];

router.get('/', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ data: fallbackActivities });
    }
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
