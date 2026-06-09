import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const activities = [
  { id: 'act-1', userId: '1', type: 'run', distanceKm: 5, durationMinutes: 30 },
  { id: 'act-2', userId: '2', type: 'cycle', distanceKm: 20, durationMinutes: 60 },
];

router.get('/', (req: Request, res: Response) => {
  res.json({ data: activities });
});

router.post('/', (req: Request, res: Response) => {
  const activity = { id: `act-${Date.now()}`, ...req.body };
  activities.push(activity);
  res.status(201).json({ data: activity });
});

export default router;
